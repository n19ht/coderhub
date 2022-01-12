const Router = require('koa-router')

const { verifyUser, handPassword } = require('../middleware/user.middleware')
const { create, avatarInfo } = require('../controller/user.controller')
const userRouter = new Router({ prefix: '/users' })
userRouter.post('/', verifyUser, handPassword, create)
userRouter.get('/:userId/avatar', avatarInfo)

module.exports = userRouter