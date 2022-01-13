const { createAvatar, } = require('../service/file.service')
const { AVATAR_PATH } = require('../constants/file-path')
const { APP_HOST, APP_PORT } = require('../app/config')
const UserService = require('../service/user.service')

class Filecontroller {
    async saveAvatarInfo(ctx, next) {
        const { filename, mimetype, size } = ctx.req.file
        const { id } = ctx.user
        const res = await createAvatar(filename, mimetype, size, id)
        const avatarUrl = `${APP_HOST}:${APP_PORT}/users/${id}/avatar`
        await UserService.updateAvatarUrl(id, avatarUrl)
        ctx.body = res
    }
    async savePictureInfo(ctx, next) {
        const { files } = ctx.req
        const { id } = ctx.user
        const {momentId}=ctx.query
        for (const file of files) {
            const { filename, mimetype, size } = file
            await UserService.createFile(filename, mimetype, size, id, momentId)
        }
        ctx.body="动态配图上传成功"
    }

}

module.exports = new Filecontroller()