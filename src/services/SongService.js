const { Pool } = require('pg');
const pool = new Pool();
const { InvariantError, NotFoundError } = require('../utils/errorHandler'); // path fix

class SongService {
  async addSong({ id, title, year, performer, genre, duration, albumId }) {
    if (albumId) {
      const album = await pool.query('SELECT id FROM albums WHERE id=$1', [albumId]);
      if (!album.rows[0]) throw new InvariantError('Album tidak ditemukan');
    }

    const query = {
      text: `INSERT INTO songs(id,title,year,performer,genre,duration,album_id)
             VALUES($1,$2,$3,$4,$5,$6,$7)`,
      values: [id, title, year, performer, genre, duration || null, albumId || null]
    };
    await pool.query(query);
    return id;
  }

  async getSongById(id) {
    const result = await pool.query(
      'SELECT id,title,year,performer,genre,duration,album_id as "albumId" FROM songs WHERE id=$1',
      [id]
    );
    if (!result.rows[0]) throw new NotFoundError('Lagu tidak ditemukan');
    return result.rows[0];
  }

  async updateSong(id, { title, year, performer, genre, duration, albumId }) {
    if (albumId) {
      const album = await pool.query('SELECT id FROM albums WHERE id=$1', [albumId]);
      if (!album.rows[0]) throw new InvariantError('Album tidak ditemukan');
    }

    const query = {
      text: `UPDATE songs SET title=$1, year=$2, performer=$3, genre=$4, duration=$5, album_id=$6
             WHERE id=$7 RETURNING id`,
      values: [title, year, performer, genre, duration || null, albumId || null, id]
    };

    const result = await pool.query(query);
    if (!result.rowCount) throw new NotFoundError('Lagu tidak ditemukan');
    return true;
  }

  async deleteSong(id) {
    const result = await pool.query('DELETE FROM songs WHERE id=$1', [id]);
    if (!result.rowCount) throw new NotFoundError('Lagu tidak ditemukan');
    return true;
  }

  async getAllSongs({ title, performer } = {}) {
    let query = 'SELECT id,title,performer FROM songs';
    const conditions = [];
    const values = [];

    if (title) {
      values.push(`%${title}%`);
      conditions.push(`title ILIKE $${values.length}`);
    }
    if (performer) {
      values.push(`%${performer}%`);
      conditions.push(`performer ILIKE $${values.length}`);
    }
    if (conditions.length) query += ' WHERE ' + conditions.join(' AND ');

    const result = await pool.query(query, values);
    return result.rows;
  }
}

module.exports = SongService;
