const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const userRouter = require('../router/user.router')
const authRouter = require('../router/auth.router')
const errorHandler = require('./error-handle')
const useRoutes = require('../router')
const app = new Koa()
app.use(bodyParser())
useRoutes(app)//集体使用中间件

app.on('error', errorHandler)
module.exports = app