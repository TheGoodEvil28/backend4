const { Pool } = require('pg');
const pool = new Pool();
const { NotFoundError } = require('../utils/errors');

class AlbumService {
  async addAlbum({ id, name, year }) {
    await pool.query('INSERT INTO albums(id,name,year) VALUES($1,$2,$3)', [id,name,year]);
    return id;
  }

  async getAlbumById(id) {
    const album = await pool.query('SELECT id,name,year FROM albums WHERE id=$1', [id]);
    if (!album.rows[0]) throw new NotFoundError('Album tidak ditemukan');
    const songs = await pool.query('SELECT id,title,performer FROM songs WHERE album_id=$1', [id]);
    return { ...album.rows[0], songs: songs.rows };
  }

  async updateAlbum(id, { name, year }) {
    const result = await pool.query('UPDATE albums SET name=$1, year=$2 WHERE id=$3 RETURNING id', [name,year,id]);
    if (!result.rowCount) throw new NotFoundError('Album tidak ditemukan');
    return true;
  }

  async deleteAlbum(id) {
    const result = await pool.query('DELETE FROM albums WHERE id=$1', [id]);
    if (!result.rowCount) throw new NotFoundError('Album tidak ditemukan');
    return true;
  }
}

module.exports = AlbumService;
