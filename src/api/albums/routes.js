const {
  addAlbumHandler,
  getAlbumByIdHandler,
  updateAlbumHandler,
  deleteAlbumHandler
} = require('./handler');

module.exports = [
  { method: 'POST', path: '/albums', handler: addAlbumHandler },
  { method: 'GET', path: '/albums/{id}', handler: getAlbumByIdHandler },
  { method: 'PUT', path: '/albums/{id}', handler: updateAlbumHandler },
  { method: 'DELETE', path: '/albums/{id}', handler: deleteAlbumHandler }
];

