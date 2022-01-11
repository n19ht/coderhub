const connection = require('../app/database')
class AuthService {
    async checkResource(tableName, userId, id) {
        const statement = `SELECT * FROM ${tableName} WHERE user_id=?&&id=?`
        const [res] = await connection.execute(statement, [userId, id])
        return !!res.length
    }
}

module.exports = new AuthService()