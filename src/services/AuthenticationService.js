const { nanoid } = require('nanoid');
const jwt = require('jsonwebtoken');
const pool = require('../utils/postgresPool'); // koneksi DB
const bcrypt = require('bcrypt');
const ClientError = require('../utils/errorHandler').ClientError;

class AuthenticationService {
  async verifyUserCredential(username, password) {
    const query = {
      text: 'SELECT id, password FROM users WHERE username=$1',
      values: [username],
    };

    const result = await pool.query(query);
    if (!result.rowCount) {
      throw new ClientError('Username tidak ditemukan', 401);
    }

    const { id, password: hashedPassword } = result.rows[0];
    const match = await bcrypt.compare(password, hashedPassword);
    if (!match) {
      throw new ClientError('Password salah', 401);
    }

    return id;
  }

  async generateAccessToken(user) {
    const payload = { userId: user.id };
    return jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, { expiresIn: '15m' });
  }

  async generateRefreshToken(user) {
    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, { expiresIn: '7d' });

    // simpan ke DB
    const query = {
      text: 'INSERT INTO authentications(token) VALUES($1)',
      values: [token],
    };
    await pool.query(query);

    return token;
  }

  async verifyRefreshToken(token) {
    try {
      jwt.verify(token, process.env.REFRESH_TOKEN_KEY);
      const query = {
        text: 'SELECT token FROM authentications WHERE token=$1',
        values: [token],
      };
      const result = await pool.query(query);
      if (!result.rowCount) throw new Error();
    } catch {
      throw new ClientError('Refresh token tidak valid', 400);
    }
  }

  async deleteRefreshToken(token) {
    const query = {
      text: 'DELETE FROM authentications WHERE token=$1 RETURNING token',
      values: [token],
    };
    const result = await pool.query(query);
    if (!result.rowCount) {
      throw new ClientError('Refresh token gagal dihapus', 400);
    }
  }
}

module.exports = AuthenticationService;
