const Router = require('koa-router')

const {
  avatarHandler,
  pictureHandler,
} = require('../middleware/file.middleware')

const { verifyAuth } = require('../middleware/auth.middleware')

const { saveAvatarInfo, savePictureInfo } = require('../controller/file.controller')

const fileRouter = new Router({ prefix: '/upload' })

fileRouter.post('/avatar', avatarHandler, verifyAuth, saveAvatarInfo)
fileRouter.post('/picture', pictureHandler, verifyAuth, savePictureInfo)

module.exports = fileRouter
