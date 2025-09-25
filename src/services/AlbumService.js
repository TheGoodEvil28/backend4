const { Pool } = require('pg');
const pool = new Pool();
const { InvariantError, NotFoundError } = require('../utils/errorHandler');

class AlbumService {
  async addAlbum({ id, name, year }) {
    try {
      const result = await pool.query(
        'INSERT INTO albums(id, name, year) VALUES($1, $2, $3) RETURNING id',
        [id, name, year]
      );
      return result.rows[0].id;
    } catch (err) {
      throw new InvariantError('Gagal menambahkan album: ' + err.message);
    }
  }

  async getAlbumById(id) {
    try {
      const albumResult = await pool.query(
        'SELECT id, name, year FROM albums WHERE id=$1',
        [id]
      );

      if (!albumResult.rows[0]) {
        throw new NotFoundError('Album tidak ditemukan');
      }

      const songsResult = await pool.query(
        'SELECT id, title, performer FROM songs WHERE album_id=$1',
        [id]
      );

      return { ...albumResult.rows[0], songs: songsResult.rows };
    } catch (err) {
      if (err instanceof NotFoundError) throw err;
      throw new InvariantError('Gagal mengambil album: ' + err.message);
    }
  }

  async updateAlbum(id, { name, year }) {
    try {
      const result = await pool.query(
        'UPDATE albums SET name=$1, year=$2 WHERE id=$3 RETURNING id',
        [name, year, id]
      );

      if (!result.rows[0]) {
        throw new NotFoundError('Album tidak ditemukan');
      }
    } catch (err) {
      if (err instanceof NotFoundError) throw err;
      throw new InvariantError('Gagal memperbarui album: ' + err.message);
    }
  }

  async deleteAlbum(id) {
    try {
      const result = await pool.query(
        'DELETE FROM albums WHERE id=$1 RETURNING id',
        [id]
      );

      if (!result.rows[0]) {
        throw new NotFoundError('Album tidak ditemukan');
      }
    } catch (err) {
      if (err instanceof NotFoundError) throw err;
      throw new InvariantError('Gagal menghapus album: ' + err.message);
    }
  }
}

module.exports = AlbumService;
