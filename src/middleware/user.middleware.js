const errorType = require('../constants/error-types')
const service = require('../service/user.service')
const { md5Password } = require('../utils/password-handle')
const verifyUser = async (ctx, next) => {
    const { name, password } = ctx.request.body
    //用户名或者密码为空
    if (!name || !password) {
        const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRE)
        return ctx.app.emit('error', error, ctx)
    }
    //判断用户名是否存在
    const res = await service.getUserByName(name)
    if (res.length) {
        const error = new Error(errorType.USER_ALREADY_EXISTS)
        return ctx.app.emit('error', error, ctx)
    }
    await next()
}

//使用md5加密
const handPassword = async (ctx, next) => {
    const { password } = ctx.request.body
    ctx.request.body.password = md5Password(password)
    await next()
}

module.exports = {
    verifyUser,
    handPassword
}