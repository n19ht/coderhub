const connection = require('../app/database')
class CommentService {
    async create(userId, momentId, content) {
        const statement = `INSERT INTO comment (user_id,moment_id,content) VALUES(?,?,?)`
        const [res] = await connection.execute(statement, [userId, momentId, content])
        return res
    }
    async reply(userId, momentId, content, commentId) {
        const statement = `INSERT INTO comment (user_id,moment_id,content,comment_id) VALUES(?,?,?,?)`
        const [res] = await connection.execute(statement, [userId, momentId, content, commentId])
        return res
    }
    async update(commentId, content) {
        const statement = `UPDATE comment SET content=? WHERE id=?`
        const [res] = await connection.execute(statement, [content, commentId])
        return res
    }
    async remove(commentId) {
        const statement = `DELETE FROM comment WHERE id=?`
        const [res] = await connection.execute(statement, [commentId])
        return res
    }
    async getCommentsByMomentId(momentId){
        const statement = `SELECT * FROM comment WHERE moment_id=?`
        const [res] = await connection.execute(statement, [momentId])
        return res
    }
}

module.exports = new CommentService()