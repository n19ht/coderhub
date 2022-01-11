const commentService = require('../service/comment.service')

class CommentController {
    async create(ctx, next) {
        const userId = ctx.user.id
        const { momentId, content } = ctx.request.body
        const res = await commentService.create(userId, momentId, content)
        ctx.body = res
    }
    async reply(ctx, next) {
        const userId = ctx.user.id
        const { commentId } = ctx.params
        const { momentId, content } = ctx.request.body
        const res = await commentService.reply(userId, momentId, content, commentId)
        ctx.body = res
    }
    async update(ctx, next) {
        const { commentId } = ctx.params
        const { content } = ctx.request.body
        const res = await commentService.update(commentId, content)
        ctx.body = res
    }
    async remove(ctx, next) {
        const { commentId } = ctx.params
        const res = await commentService.remove(commentId)
        ctx.body = res
    }
    async list(ctx, next) {
        const { momentId } = ctx.query
        const res = await commentService.getCommentsByMomentId(momentId)
        ctx.body = res
    }
}

module.exports = new CommentController()