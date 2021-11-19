const connection = require('../app/database')

class CommentService {
  async create(momentId, content, id) {
    const statement = `INSERT INTO comment (moment_id, content, user_id) VALUES (?, ?, ?);`
    const [result] = await connection.execute(statement, [
      momentId,
      content,
      id,
    ])
    return result
  }

  async reply(momentId, content, id, commentId) {
    const statement = `INSERT INTO comment (moment_id, content, user_id, comment_id) VALUES (?, ?, ?, ?);`
    const [result] = await connection.execute(statement, [
      momentId,
      content,
      id,
      commentId,
    ])
    return result
  }
}

module.exports = new CommentService()
