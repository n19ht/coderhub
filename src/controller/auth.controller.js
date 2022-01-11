const jwt = require('jsonwebtoken')
const KEY = require('../key/key')
class AuthController {
    async login(ctx, next) {
        const { id, name } = ctx.user
        const token = jwt.sign({ id, name }, KEY, {
            expiresIn: 60 * 60 * 24
        })
        ctx.body = { id, name, token }
    }
    async success(ctx, next) {
        ctx.body = '验证token成功'
    }
}

module.exports = new AuthController()