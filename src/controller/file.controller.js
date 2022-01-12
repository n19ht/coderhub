const { createAvatar, } = require('../service/file.service')

class Filecontroller {
    async saveAvatarInfo(ctx, next) {
        const { filename, mimetype, size } = ctx.req.file
        const { id } = ctx.user
        const res = await createAvatar(filename, mimetype, size, id)
        ctx.body = res
    }
}

module.exports = new Filecontroller()