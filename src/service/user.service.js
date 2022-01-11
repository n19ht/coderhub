const connection = require('../app/database')
class UserService {
    async create(user) {
        const { name, password } = user
        const statement = `INSERT INTO users (name,password) VALUES (?,?)`
        const res = await connection.execute(statement, [name, password])
        return res[0]
    }
    async getUserByName(name) {
        const statement =`SELECT * FROM users WHERE name = ?`
        const res = await connection.execute(statement, [name])
        return res[0]
    }
}

module.exports = new UserService()