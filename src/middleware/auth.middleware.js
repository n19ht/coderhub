const jwt = require('jsonwebtoken')

const KEY = require('../key/key')
const errorType = require('../constants/error-types')
const userService = require('../service/user.service')
const authService = require('../service/auth.service')
const { md5Password } = require('../utils/password-handle')

const verifyLogin = async (ctx, next) => {
    const { name, password } = ctx.request.body
    //判断用户名和密码是否为空
    if (!name || !password) {
        const error = new Error(errorType.NAME_OR_PASSWORD_IS_REQUIRE)
        return ctx.app.emit('error', error, ctx)
    }
    //判断用户是否存在
    const res = await userService.getUserByName(name)
    const user = res[0]
    if (!user) {
        const error = new Error(errorType.USER_DOES_NOT_EXISTS)
        return ctx.app.emit('error', error, ctx)
    }
    //判断密码是否和数据库中的密码一致
    if (user.password !== md5Password(password)) {
        const error = new Error(errorType.PASSWORD_IS_INCORRENT)
        return ctx.app.emit('error', error, ctx)
    }
    ctx.user = user
    await next()
}

const verifyAuth = async (ctx, next) => {
    console.log('验证授权的middleware');
    //获取token
    const anthorization = ctx.headers.authorization
    if (!anthorization) {
        const error = new Error(errorType.UNAUTHORIZATION)
        return ctx.app.emit('error', error, ctx)
    }
    const token = anthorization.replace('Bearer ', '')
    //验证token
    try {
        const res = jwt.verify(token, KEY)
        ctx.user = res
        await next()
    } catch (err) {
        const error = new Error(errorType.UNAUTHORIZATION)
        ctx.app.emit('error', error, ctx)
    }
}
const verifyPermission = async (ctx, next) => {
    console.log('验证权限的middleware');
    const [key] = Object.keys(ctx.params)
    const tableName = key.replace('Id', '')
    const userId = ctx.user.id
    const id = ctx.params[key]
    try {
        const isPermission = await authService.checkResource(tableName, userId, id)
        if (!isPermission) {
            throw new Error()
        }
    } catch (err) {
        const error = new Error(errorType.UNPERMISSION)
        return ctx.app.emit('error', error, ctx)
    }
    await next()
}
module.exports = { verifyLogin, verifyAuth, verifyPermission }