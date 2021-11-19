const Router = require('koa-router')

const commentRouter = new Router({ prefix: '/comment' })

const { verifyAuth } = require('../middleware/auth.middleware')

const { create, reply } = require('../controller/comment.controller')

commentRouter.post('/', verifyAuth, create)
commentRouter.post('/reply', verifyAuth, reply)

module.exports = commentRouter
