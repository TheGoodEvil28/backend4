const PlaylistSongsHandler = require('./handler');
const PlaylistSongsValidator = require('./validator');
const PlaylistSongsService = require('../../services/PlaylistSongsService');

const service = new PlaylistSongsService();
const validator = new PlaylistSongsValidator();
const handler = new PlaylistSongsHandler(service, validator);

module.exports = [
  {
    method: 'POST',
    path: '/playlists/{id}/songs', // ✅ path sesuai pengujian
    handler: handler.postPlaylistSongHandler,
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}/songs', // ✅ path sesuai pengujian
    handler: handler.deletePlaylistSongHandler,
  },
  {
    method: 'GET',
    path: '/playlists/{id}/songs', // ✅ tetap sama
    handler: handler.getPlaylistSongsHandler,
  },
];
