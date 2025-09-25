const {
  addSongHandler,
  getAllSongsHandler,
  getSongByIdHandler,
  updateSongHandler,
  deleteSongHandler
} = require('./handler');

module.exports = [
  { method: 'POST', path: '/songs', handler: addSongHandler },
  { method: 'GET', path: '/songs', handler: getAllSongsHandler },
  { method: 'GET', path: '/songs/{id}', handler: getSongByIdHandler },
  { method: 'PUT', path: '/songs/{id}', handler: updateSongHandler },
  { method: 'DELETE', path: '/songs/{id}', handler: deleteSongHandler }
];
