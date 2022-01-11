const Router = require('koa-router')

const { verifyAuth, verifyPermission } = require('../middleware/auth.middleware')
const { verifyLabelExists } = require('../middleware/label.middleware')
const { create, momentDetail, list, update, remove, addLabels } = require('../controller/moment.controller')

const momentRouter = new Router({ prefix: '/moment' })
momentRouter.post('/', verifyAuth, create)
momentRouter.get('/', list)
momentRouter.patch('/:momentId', verifyAuth, verifyPermission, update)
momentRouter.delete('/:momentId', verifyAuth, verifyPermission, remove)
momentRouter.get('/:momentId', momentDetail)
momentRouter.post('/:momentId/labels', verifyAuth, verifyPermission, verifyLabelExists, addLabels)

module.exports = momentRouter