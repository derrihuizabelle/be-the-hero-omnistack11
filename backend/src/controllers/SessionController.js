const connection = require('../database/connection')

module.exports = {
    async create (request, response) {
        const { id } = request.body

        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first()

    return ong ? response.json(ong) 
        : response.status(400).json({ error: 'No Ong Found' })
    }
}