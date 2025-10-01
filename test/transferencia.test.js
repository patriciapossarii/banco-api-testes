const request = require('supertest');
const { expect } = require('chai');
require('dotenv').config();
const { obterToken } = require('../helpers/autenticacao')
const postTransferencias = require('../fixtures/postTransferencias.json')

describe('Transferencias', () => {
    let token

    beforeEach(async () => {
        token = await obterToken('julio.lima', '123456')
    })

    describe('POST /Transferencias', () => {
        it('Deve retornar sucesso 201 quado valor de transferência for igual ou acima de R$ 10,00', async () => {
            const bodyTransferencias = { ...postTransferencias }
            bodyTransferencias.valor = 12
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
            const resposta = await request(process.env.BASE_URL)
                .post('/transferencias')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
                .send(bodyTransferencias)
            expect(resposta.status).to.equal(422);
            expect(resposta.body.error).to.equal('O valor da transferência deve ser maior ou igual a R$10,00.');
        })
    })

    describe('GET /Transferencias/{id}', () => {
        it('Deve retornar sucesso com 200 e dados iguais ao registro de transferencia cotido no banco de dados quando ID for válido', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/transferencias/35')
                .set('Content-Type', 'application/json')
                .set('Authorization', `Bearer ${token}`)
            expect(resposta.status).to.equal(200);
            expect(resposta.body.id).to.equal(35);
            expect(resposta.body.id).to.be.a('number')
            expect(resposta.body.conta_origem_id).to.equal(1)
        })

    })

    describe('GET /Transferencias', () => {
        it('Deve retornar 10 elementos na paginação quando informar limite de 10 registros', async () => {
            const resposta = await request(process.env.BASE_URL)
                .get('/transferencias?page=1&limit=10')
                .set('Authorization', `Bearer ${token}`)
            expect(resposta.status).to.equal(200);
            expect(resposta.body.limit).to.equal(10)
            expect(resposta.body.transferencias).to.have.lengthOf(10)

        })
    })

})

