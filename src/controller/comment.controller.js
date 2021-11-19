const service = require('../service/comment.service')

class CommentController {
  async create(ctx, next) {
    const { momentId, content } = ctx.request.body
    const { id } = ctx.user
    const result = await service.create(momentId, content, id)
    ctx.body = result
  }

  async reply(ctx, next) {
    const { mommentId, content, commentId } = ctx.request.body
    const { id } = ctx.user
    const result = await service.reply(mommentId, content, id, commentId)
    ctx.body = result
  }
}

module.exports = new CommentController()
