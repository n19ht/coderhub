const connection = require('../app/database')

class LabelService {
    async create(labelName) {
        const statement = `INSERT INTO label (name) VALUES(?)`
        const [res] = await connection.execute(statement, [labelName])
        return res
    }
    async getLabelByName(labelName) {
        const statement = `SELECT * FROM label WHERE name=?`
        const [res] = await connection.execute(statement, [labelName])
        return res[0]
    }
    async getLabels(limit, offset) {
        const statement = `SELECT * FROM label LIMIT ?,?`
        const [res] = await connection.execute(statement, [offset, limit])
        return res
    }
}

module.exports = new LabelService()