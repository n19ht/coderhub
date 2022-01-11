const labelService = require('../service/label.service')

const verifyLabelExists = async (ctx, next) => {
    const { labels } = ctx.request.body
    const newLabels = []
    for (const name of labels) {
        const labelRes = await labelService.getLabelByName(name)
        const label = { name }
        if (!labelRes) {
            const res = await labelService.create(name)
            label.id = res.insertId
        } else {
            label.id = labelRes.id
        }
        newLabels.push(label)
    }
    ctx.labels = newLabels
    await next()
}

module.exports = {
    verifyLabelExists
}