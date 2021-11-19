const fs = require('fs')

const userService = require('../service/user.service')
const fileService = require('../service/file.service')
const { AVATAR_PATH } = require('../constants/filepath')

class UserController {
  async create(ctx, next) {
    // 获取用户请求的参数
    const user = ctx.request.body

    // 查询数据
    const result = await userService.create(user)

    // 返回数据
    ctx.body = result
  }

  async avatarInfo(ctx, next) {
    const { userId } = ctx.params
    const avatarInfo = await fileService.getAvatarByUserId(userId)
    // 如果不告诉浏览器是什么类型的文件会直接下载下来
    ctx.response.set('content-type', avatarInfo.mimetype)
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${avatarInfo.filename}`)
  }
}

module.exports = new UserController()
