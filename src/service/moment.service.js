const connection = require('../app/database')
const sqlFragent=
`
SELECT
	m.id id,
	m.content content,
	m.createAt createTime,
	m.updateAt updateTime,
	JSON_OBJECT( 'id', u.id, 'name', u.NAME ) author
FROM
	moment m
	LEFT JOIN users u ON m.user_id = u.id 
`
class MomentService {
    async create(id, content) {
        const statement = `INSERT INTO moment(user_id,content) VALUES(?,?)`
        const [res] = await connection.execute(statement, [id, content])
        return res
    }
    async getMomentById(id) {
        const statement =
            `
            SELECT
                m.id id,
                m.content content,
                m.createAt createTime,
                m.updateAt updateTime,
                JSON_OBJECT( 'id', u.id, 'name', u.NAME ) author 
            FROM
                moment m
                LEFT JOIN users u ON m.user_id = u.id 
            WHERE
                m.id =?
            `
        const [res] = await connection.execute(statement, [id])
        return res[0]
    }
    async getMomentLits(offset, size){
        const statement = `
            SELECT
                m.id id,
                m.content content,
                m.createAt createTime,
                m.updateAt updateTime,
                JSON_OBJECT( 'id', u.id, 'name', u.NAME ) author,
                ( SELECT COUNT(*) FROM COMMENT c WHERE c.moment_id = m.id ) momentCounter 
            FROM
                moment m
                LEFT JOIN users u ON m.user_id = u.id 
                LIMIT ?,?
            `
        const [res] = await connection.execute(statement, [offset, size])
        return res
    }
    async update(content,momentId){
        const statement =`UPDATE moment SET content=? WHERE id=?`
        const [res] = await connection.execute(statement, [content, momentId])
        return res
    }
    async remove(momentId){
        const statement = `DELETE FROM moment WHERE id=?`
        const [res] = await connection.execute(statement, [ momentId])
        return res
    }
    async hasLabel(momentId,labelId){
        const statement = `SELECT * FROM moment_label WHERE moment_id=? && label_id=?`
        const [res] = await connection.execute(statement, [momentId, labelId])
        return !!res.length
    }
    async addLabel(momentId, labelId){
        const statement = `INSERT INTO moment_label(moment_id,label_id) VALUES(?,?)`
        const [res] = await connection.execute(statement, [momentId, labelId])
        return res
    }
}

module.exports = new MomentService()