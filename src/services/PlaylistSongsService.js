const { nanoid } = require('nanoid');
const pool = require('../utils/postgresPool');
const { ClientError } = require('../utils/errorHandler');

class PlaylistSongsService {
  // Add song to playlist
  async addSongToPlaylist({ playlistId, songId, owner }) {
    // Optional: verify playlist belongs to user
    const playlistCheck = await pool.query(
      'SELECT * FROM playlists WHERE id=$1 AND owner=$2',
      [playlistId, owner]
    );
    if (!playlistCheck.rowCount) throw new ClientError('Playlist tidak ditemukan atau bukan milik Anda', 404);

    // Optional: verify song exists
    const songCheck = await pool.query('SELECT * FROM songs WHERE id=$1', [songId]);
    if (!songCheck.rowCount) throw new ClientError('Lagu tidak ditemukan', 404);

    const id = `playlistsong-${nanoid(16)}`;
    await pool.query(
      'INSERT INTO playlistsongs(id, playlist_id, song_id) VALUES($1, $2, $3)',
      [id, playlistId, songId]
    );
  }

  async getPlaylistById(playlistId) {
    const query = {
        text: `
            SELECT p.id, p.name, u.username
            FROM playlists p
            JOIN users u ON p.owner = u.id
            WHERE p.id = $1
        `,
        values: [playlistId],
    };

    const result = await pool.query(query);
    return result.rows[0]; // undefined if not found
}


  // Get all songs in a playlist
  async getSongsFromPlaylist(playlistId) {
    const query = {
      text: `
        SELECT s.id, s.title, s.performer
        FROM songs s
        JOIN playlistsongs ps ON s.id = ps.song_id
        WHERE ps.playlist_id = $1
      `,
      values: [playlistId],
    };

    const result = await pool.query(query);
    return result.rows;
  }
}

module.exports = PlaylistSongsService;
