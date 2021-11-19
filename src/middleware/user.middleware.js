const service = require('../service/user.service')
const errorTypes = require('../constants/error-types')
const md5password = require('../utils/password-handle')

const verifyUser = async (ctx, next) => {
  // 获取用户名密码
  const { name, password } = ctx.request.body

  // 判断用户名密码不为空
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PWD_IS_REQUIRED)
    return ctx.app.emit('error', error, ctx)
  }

  // 判断用户名是否注册过
  const result = await service.getUserByName(name)
  if (result.length) {
    const error = new Error(errorTypes.USER_ALREADY_EXISTS)
    return ctx.app.emit('error', error, ctx)
  }

  await next()
}

const handlePassword = async (ctx, next) => {
  let { password } = ctx.request.body
  ctx.request.body.password = await md5password(password)
  await next()
}

module.exports = {
  verifyUser,
  handlePassword,
}
