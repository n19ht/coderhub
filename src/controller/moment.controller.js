const momentService = require('../service/moment.service')

class MomentController {
    async create(ctx, next) {
        const { id } = ctx.user
        const { content } = ctx.request.body
        const res = await momentService.create(id, content)
        ctx.body = res
    }
    async momentDetail(ctx, next) {
        const { momentId } = ctx.params
        const res = await momentService.getMomentById(momentId)
        ctx.body = res
    }
    async list(ctx, next) {
        const { offset, size } = ctx.query
        const res = await momentService.getMomentLits(offset, size)
        ctx.body = res
    }
    async update(ctx, next) {
        const { momentId } = ctx.params
        const { content } = ctx.request.body
        const res = await momentService.update(content, momentId)
        ctx.body = res
    }
    async remove(ctx, next) {
        const { momentId } = ctx.params
        const res = await momentService.remove(momentId)
        ctx.body = res
    }
    async addLabels(ctx, next) {
        const { labels } = ctx
        const { momentId } = ctx.params
        for (const label of labels) {
            const isExist = await momentService.hasLabel(momentId, label.id)
            if (!isExist) {
                await momentService.addLabel(momentId, label.id)
            }
        }
        ctx.body = '为动态添加标签成功'
    }
}

module.exports = new MomentController()