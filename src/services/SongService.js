const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool();

class SongService {
  async addSong({ id, title, year, performer, genre, duration, albumId }) {
    const query = {
      text: `INSERT INTO songs(id, title, year, performer, genre, duration, album_id)
             VALUES($1,$2,$3,$4,$5,$6,$7)`,
      values: [id, title, year, performer, genre, duration || null, albumId || null]
    };
    await pool.query(query);
    return id;
  }

  async getAllSongs() {
    const result = await pool.query('SELECT id, title, performer FROM songs');
    return result.rows;
  }

  async getSongById(id) {
    const query = {
      text: `SELECT id, title, year, performer, genre, duration, album_id as "albumId"
             FROM songs WHERE id=$1`,
      values: [id]
    };
    const result = await pool.query(query);
    return result.rows[0];
  }

  async updateSong(id, { title, year, performer, genre, duration, albumId }) {
    const query = {
      text: `UPDATE songs SET title=$1, year=$2, performer=$3, genre=$4, duration=$5, album_id=$6
             WHERE id=$7 RETURNING id`,
      values: [title, year, performer, genre, duration || null, albumId || null, id]
    };
    const result = await pool.query(query);
    return result.rowCount > 0;
  }

  async deleteSong(id) {
    const query = {
      text: 'DELETE FROM songs WHERE id=$1',
      values: [id]
    };
    const result = await pool.query(query);
    return result.rowCount > 0;
  }
}

module.exports = SongService;
