const fs = require('fs')

const { AVATAR_PATH } = require('../constants/file-path')
const service = require('../service/user.service')
const { getAvatarByUserId } = require('../service/file.service')

class UserController {
    async create(ctx, next) {
        const user = ctx.request.body
        const res = await service.create(user)
        ctx.body = res
    }
    async avatarInfo(ctx, next) {
        const { userId } = ctx.params
        const res = await getAvatarByUserId(userId)
        ctx.response.set('content-type', res.mimetype)
        ctx.body = fs.createReadStream(`${AVATAR_PATH}/${res.filename}`)

    }
}

module.exports = new UserController()