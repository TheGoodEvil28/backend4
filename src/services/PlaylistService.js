const { nanoid } = require('nanoid');
const pool = require('../utils/postgresPool');
const { ClientError } = require('../utils/errorHandler');

class PlaylistService {
  async addPlaylist({ name, owner }) {
    const id = `playlist-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO playlists(id, name, owner) VALUES($1, $2, $3) RETURNING id',
      values: [id, name, owner],
    };

    const result = await pool.query(query);

    if (!result.rowCount) throw new ClientError('Gagal menambahkan playlist', 500);
    return result.rows[0].id;
  }

  async getPlaylists(owner) {
    const query = {
      text: `
        SELECT p.id, p.name, u.username
        FROM playlists p
        JOIN users u ON p.owner = u.id
        WHERE p.owner = $1
      `,
      values: [owner],
    };

    const result = await pool.query(query);

    return result.rows.map(row => ({
      id: row.id,
      name: row.name,
      username: row.username,
    }));
  }

  async deletePlaylist(id, owner) {
    const query = {
      text: 'DELETE FROM playlists WHERE id=$1 AND owner=$2 RETURNING id',
      values: [id, owner],
    };

    const result = await pool.query(query);

    if (!result.rowCount) throw new ClientError('Playlist tidak ditemukan atau bukan milik Anda', 404);
  }
}

module.exports = PlaylistService;
