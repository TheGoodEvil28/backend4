const PlaylistsHandler = require('./handler');
const PlaylistsValidator = require('./validator');
const PlaylistService = require('../../services/PlaylistService');

const playlistService = new PlaylistService();
const playlistsValidator = new PlaylistsValidator();
const playlistsHandler = new PlaylistsHandler(playlistService, playlistsValidator);

module.exports = [
  {
    method: 'POST',
    path: '/playlists',
    handler: playlistsHandler.postPlaylistHandler,
    options: {
      auth: 'openmusic_jwt', // <-- protect this route
    },
  },
  {
    method: 'GET',
    path: '/playlists',
    handler: playlistsHandler.getPlaylistsHandler,
    options: {
      auth: 'openmusic_jwt', // <-- protect this route
    },
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}',
    handler: playlistsHandler.deletePlaylistHandler,
    options: {
      auth: 'openmusic_jwt', // <-- protect this route
    },
  },
];

