const PlaylistSongsHandler = require('./handler');
const PlaylistSongsValidator = require('./validator');
const PlaylistSongsService = require('../../services/PlaylistSongsService');

const service = new PlaylistSongsService();
const validator = new PlaylistSongsValidator();
const handler = new PlaylistSongsHandler(service, validator);

module.exports = [
  {
    method: 'POST',
    path: '/playlistsongs',
    handler: handler.postPlaylistSongHandler,
  },
  {
    method: 'DELETE',
    path: '/playlistsongs',
    handler: handler.deletePlaylistSongHandler,
  },
  {
    method: 'GET',
    path: '/playlists/{id}/songs',
    handler: handler.getPlaylistSongsHandler,
  },
];
