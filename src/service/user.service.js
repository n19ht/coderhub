const connection = require('../app/database')
class UserService {
    async create(user) {
        const { name, password } = user
        const statement = `INSERT INTO users (name,password) VALUES (?,?)`
        const res = await connection.execute(statement, [name, password])
        return res[0]
    }
    async getUserByName(name) {
        const statement = `SELECT * FROM users WHERE name = ?`
        const res = await connection.execute(statement, [name])
        return res[0]
    }
    async updateAvatarUrl(id, url) {
        const statement = `UPDATE users SET avatar_url = ? WHERE id = ? `
        const res = await connection.execute(statement, [url, id])
        return res
    }
    async createFile(filename,mimetype,size,userId,momentId) {
        const statement = `INSERT INTO file (filename,mimetype,size,user_id,moment_id) VALUES (?,?,?,?,?)`
        const res = await connection.execute(statement, [filename, mimetype, size, userId, momentId])
        return res
    }
}

module.exports = new UserService()