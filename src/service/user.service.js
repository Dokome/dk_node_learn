const connection = require('../app/database')

class UserService {
  async create(user) {
    const { name, password } = user
    const statement = `INSERT INTO users (name, password) VALUES (? ,?);`

    // 将 User 存储到数据库中
    const result = await connection.execute(statement, [name, password])

    return result[0]
  }
  async getUserByName(name) {
    const statement = `SELECT * FROM users WHERE name = ?`
    const result = await connection.execute(statement, [name])
    return result[0]
  }
  async updateAvatarUrlById(avatarUrl, userId) {
    const statement = `UPDATE users SET avatar_url = ? WHERE id = ?`
    const [result] = await connection.execute(statement, [avatarUrl, userId])
    return result
  }
}

module.exports = new UserService()
