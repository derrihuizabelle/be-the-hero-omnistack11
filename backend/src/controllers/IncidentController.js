const connection = require('../database/connection')

module.exports = {

    async index (request, response) {
        const { page = 1 } = request.query //paginacao

        const [count] = await connection('incidents').count() //total de casos

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5) //paginacao
            .offset((page - 1) * 5) //paginacao
            .select(['incidents.*', 'ongs.name', 'ongs.email', 
                'ongs.whatsapp', 'ongs.city', 'ongs.uf'])

        response.header('x-total-count', count['count(*)'])

        return response.json(incidents)
    },

    async create (request, response) {

        const {
            title,
            description,
            value
        } = request.body
        
        const ong_id = request.headers.authorization 
    
       const [id] = await connection('incidents').insert({
            description,
            ong_id,
            title,
            value
        })
    
        return response.json({ id })
    },

    async delete (request, response) {
        const { id } = request.params
        const ong_id = request.headers.authorization

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first()

        if (incident.ong_id !== ong_id) {
            return response.status(401).json({ error: 'operation not permitted.' })
        }

        await connection('incidents').where('id', id).delete()

        return response.status(204).send()

    }
    
}