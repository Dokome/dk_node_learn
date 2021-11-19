const momentService = require('../service/moment.service')

class MomentController {
  async create(ctx, next) {
    // 获取一些数据 user_id content
    const userId = ctx.user.id
    const content = ctx.request.body.content
    // 将数据存入数据库
    const reuslt = await momentService.create(userId, content)
    ctx.body = reuslt
  }
  
  async detail(ctx, next) {
    // 拿到ID
    const momentId = ctx.params.momentId

    const result = await momentService.getMomentById(momentId)

    ctx.body = result
  }

  async list(ctx, next) {
    // 获取数据
    const { offset, size } = ctx.query

    // 查询列表
    const result = await momentService.getMomentList(offset, size)
    ctx.body = result
  }

  async update(ctx, next) {
    const { momentId } = ctx.params
    const { content } = ctx.request.body
    const reuslt = await momentService.update(content, momentId)
    ctx.body = reuslt     
  }

  async remove(ctx, next) {
    const { momentId } = ctx.params
    const reuslt = await momentService.remove(momentId)
    ctx.body = reuslt
  }
}

module.exports = new MomentController()
