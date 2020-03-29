const express = require('express')

const OngController = require('./controllers/OngController')
const IncidentsController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const { celebrate, Segments, Joi } = require('celebrate')

const routes = express.Router()

routes.post('/session', celebrate({
        [Segments.BODY]: Joi.object().keys({
            id: Joi.string().required()
        })
    }), SessionController.create)

routes.get('/ongs', celebrate({
        [Segments.HEADERS]: Joi.object({
            Authorization: Joi.string().required()
        }).unknown()
    }), OngController.index)

routes.post('/ongs', celebrate({
        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required().min(10).max(11),
            city: Joi.string().required(),
            Uf: Joi.string().required().length(2)
        })
    }), OngController.create)

routes.get('/incidents', celebrate({
        [Segments.QUERY]: Joi.object().keys({
            page: Joi.number()
        })
    }), IncidentsController.index)

routes.post('/incidents', celebrate({
        [Segments.BODY]: Joi.object().keys({
            title: Joi.string().required(),
            description: Joi.string().required(),
            value: Joi.number().required()
        })
    }), IncidentsController.create)

routes.delete('/incidents/:id', celebrate({
        [Segments.PARAMS]: Joi.object().keys({
            id: Joi.number().required()
        })
    }), IncidentsController.delete)

routes.get('/profile', celebrate({
        [Segments.HEADERS]: Joi.object({
            Authorization: Joi.string().required()
        }).unknown()
    }), ProfileController.index)

module.exports = routes