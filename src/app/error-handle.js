const errorTypes = require('../constants/error-types')

const errorHandler = (error, ctx) => {
  let status, message
  switch (error.message) {
    case errorTypes.NAME_OR_PWD_IS_REQUIRED:
      status = 400
      message = '用户名或密码不能为空'
      break
    case errorTypes.USER_ALREADY_EXISTS:
      status = 409
      message = '该用户名已存在'
      break
    case errorTypes.USER_NOT_EXISTS:
      status = 400
      message = '该用不存在'
      break
    case errorTypes.PASSWORD_IS_INCORRET:
      status = 400
      message = '用户密码错误'
      break
    case errorTypes.UNAUTHORIZATION:
      status = 401
      message = '无效的token~'
      break
    case errorTypes.UNPERMISSION:
      status = 401
      message = '您不具备操作的权限~'
      break
    default:
      status = 404
      message = 'Not Found'
  }

  ctx.status = status
  ctx.body = {
    code: status,
    message,
  }
}

module.exports = errorHandler
