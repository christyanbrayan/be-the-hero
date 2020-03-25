const express = require('express')
const crypto = require('crypto')

const routes = express.Router()

routes.post('/ongs', (request, response) => {
  const { name, email, whatsapp, city, uf } = request.body
  
  const id = crypto.randomBytes(4).toString('HEX')
  
  return response.json()
})

module.exports = routes