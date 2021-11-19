const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const errorHandler = require('./error-handle')
const useRouters = require('../router')

const app = new Koa()

app.use(bodyParser())
useRouters(app)
app.on('error', errorHandler)

module.exports = app
