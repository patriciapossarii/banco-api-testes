const request = require('supertest');
const { expect } = require('chai');

describe('Transferencias', () => {
    describe('POST/Transferencias', () => {
        it('Deve retornar sucesso 201 quado valor de transferência for igual ou acima de R$ 10,00', async () => {
            const respostaLogin = await request('http://localhost:3000')
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'julio.lima',
                    'senha': '123456'
                })

            const token = respostaLogin.body.token

            const resposta = await request('http://localhost:3000')
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    contaOrigem: 1,
                    contaDestino: 3,
                    valor: 11,
                    token: "string"
                })

            expect(resposta.status).to.equal(201);
            expect(resposta.body.message).to.equal('Transferência realizada com sucesso.');
        })

        it('Deve retornar falha 422 quando valor de transferência for abaixo de R$ 10,00', async () => {
            const respostaLogin = await request('http://localhost:3000')
                .post('/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'julio.lima',
                    'senha': '123456'
                })

            const token = respostaLogin.body.token

            const resposta = await request('http://localhost:3000')
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    contaOrigem: 1,
                    contaDestino: 3,
                    valor: 9,
                    token: "string"
                })

            expect(resposta.status).to.equal(422);
            expect(resposta.body.error).to.equal('O valor da transferência deve ser maior ou igual a R$10,00.');
        })


    })

})

