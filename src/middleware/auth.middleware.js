const jwt = require('jsonwebtoken')
const userService = require('../service/user.service')
const authService = require('../service/auth.service')
const errorTypes = require('../constants/error-types')
const md5password = require('../utils/password-handle')
const { PUBLIC_KEY } = require('../app/config')

const verifyLogin = async (ctx, next) => {
  // 获取用户名密码
  const { name, password } = ctx.request.body

  // 判断用户名密码不为空
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PWD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }

  // 判断是否存
  const result = await userService.getUserByName(name)
  const user = result[0]

  if (!user) {
    const error = new Error(errorTypes.USER_NOT_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }

  // 密码是否和数据库中一致
  if ((await md5password(password)) !== user.password) {
    const error = new Error(errorTypes.PASSWORD_IS_INCORRET)
    return ctx.app.emit('error', error, ctx)
  }

  ctx.user = user

  await next()
}

const verifyAuth = async (ctx, next) => {
  //获取 token
  const authorization = ctx.headers.authorization

  if (!authorization) {
    const error = new Error(errorTypes.UNAUTHORIZATION)
    return ctx.app.emit('error', error, ctx)
  }

  const token = authorization.replace('Bearer ', '')

  //验证key
  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ['RS256'],
    })
    ctx.user = result
    await next()
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION)
    ctx.app.emit('error', error, ctx)
  }
}

const verifyPermission = async (ctx, next) => {
  console.log('验证权限')

  const { momentId } = ctx.params
  const { id } = ctx.user

  const isPermission = await authService.checkMoment(momentId, id)
  if (!isPermission) {
    const error = new Error(errorTypes.UNPERMISSION)
    return ctx.app.emit('error', error, ctx)
  }

  await next()
}

module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission,
}
