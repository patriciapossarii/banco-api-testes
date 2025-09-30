const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { obterToken } = require('../helpers/autenticacao')
const postTransferencias = require('../fixtures/postTransferencias.json')

describe('Transferencias', () => {
    describe('POST/Transferencias', () => {
        let token

        beforeEach(async () => {
            token = await obterToken('julio.lima', '123456')
        })

        it('Deve retornar sucesso 201 quado valor de transferência for igual ou acima de R$ 10,00', async () => {
            const bodyTransferencias = { ...postTransferencias }
            bodyTransferencias.valor = 11
            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias)
            expect(resposta.status).to.equal(201);
            expect(resposta.body.message).to.equal('Transferência realizada com sucesso.');
        })

        it('Deve retornar falha 422 quando valor de transferência for abaixo de R$ 10,00', async () => {
            const bodyTransferencias = { ...postTransferencias }
            bodyTransferencias.valor = 9
            const resposta = await request('http://localhost:3000')
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias)
            expect(resposta.status).to.equal(422);
            expect(resposta.body.error).to.equal('O valor da transferência deve ser maior ou igual a R$10,00.');
        })


    })

})

