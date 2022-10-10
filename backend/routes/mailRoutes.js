const express = require('express')
const routes = express.Router()



const {sendMail} = require('../controllers/mailController')


routes.post("/sendmail")
module.exports = routes;