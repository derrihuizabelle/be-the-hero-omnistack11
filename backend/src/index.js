const express = require('express')
const routes = require('./routes')
const cors = require('cors')

const { errors } = require('celebrate')

const app = express()

app.use(cors()) //permitindo acesso local enquanto esta em desenvolvimento

app.use(express.json()) //converter json do request body para objeto
app.use(routes)
app.use(errors())

app.listen(3333)

/**
 * Tipos de parametros
 * 
 * query: Parametros nomeados enviados pela rota para filtros, 
 *  paginacao, etc '/users?query=2'
 * 
 * Route: Parametros usados para identificar recursos, 
 *  recursos são as entidades do banco que estamos utilizando '/users'
 * 
 * Request Body: Campos da requisição
 */

 /**
  * Banco: sql
  * QueryBuilder: Knex.js
  * Driver: sqlite3
  * 
  */

  /**
   * Entidades da aplicação:
   * 1- ONG
   * 2- Incident
   * Uma ong pode ter varios incidents e um incident tem uma só ong
   */

   /**
    * Funcionalidades da aplicação:
    * Login da ong
    * logout da ong
    * cadastro de uma ong
    * cadastrar novos incidents
    * deletar incidents
    * listar casos de certa ong
    * 
    * para o mobile: 
    * 
    * listar todos os casos de todas as ongs
    * entrar em contato com a ong
    */

