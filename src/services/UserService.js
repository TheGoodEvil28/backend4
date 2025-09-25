const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const pool = require('../utils/postgresPool'); // buat file utils/postgresPool.js untuk koneksi DB
const ClientError = require('../utils/errorHandler').ClientError;

class UserService {
  async addUser({ username, password, fullname }) {
    const id = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    const queryCheck = {
      text: 'SELECT username FROM users WHERE username = $1',
      values: [username],
    };
    const resultCheck = await pool.query(queryCheck);
    if (resultCheck.rowCount > 0) {
      throw new ClientError('Username sudah digunakan');
    }

    const query = {
      text: 'INSERT INTO users(id, username, password, fullname) VALUES($1, $2, $3, $4) RETURNING id',
      values: [id, username, hashedPassword, fullname],
    };
    const result = await pool.query(query);

    if (!result.rows[0].id) {
      throw new Error('Gagal menambahkan user');
    }
    return result.rows[0].id;
  }
}

module.exports = UserService;
