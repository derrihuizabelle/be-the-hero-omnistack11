const request = require('supertest')
const app = require('../../src/index')
const connection = require('../../src/database/connection')

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback()
        await connection.migrate.latest()
    })

    afterAll(async () => {
        await connection.destroy()
    })


    it('Should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "Confraria Só Latidos",
                email: "latidos@gmail.com",
                whatsapp: "23223456783",
                city: "Nova dd",
                uf: "RJ"
            })

        expect(response.body).toHaveProperty('id')
        expect(response.body.id).toHaveLength(8)
    })

})

//para setar um header param, use .set('nome', 'prop') antes do .send