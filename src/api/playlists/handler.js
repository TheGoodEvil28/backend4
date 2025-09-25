const autoBind = require('auto-bind');
// const ClientError = require('../utils/errorHandler').ClientError;
const { ClientError } = require('../../utils/errorHandler');
class PlaylistsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    autoBind(this);
  }

  async postPlaylistHandler(request, h) {
    try {
      this._validator.validatePlaylistPayload(request.payload);
      const { name } = request.payload;
      const { userId } = request.auth.credentials;

      const playlistId = await this._service.addPlaylist({ name, owner: userId });

      const response = h.response({
        status: 'success',
        data: { playlistId },
      });
      response.code(201);
      return response;
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error instanceof ClientError ? error.message : 'Terjadi kegagalan pada server',
      });
      response.code(error instanceof ClientError ? 400 : 500);
      return response;
    }
  }

 async getPlaylistsHandler(request, h) {
  try {
    const { userId } = request.auth.credentials;
    const playlists = await this._service.getPlaylists(userId);

    return { status: 'success', data: { playlists } };
  } catch (error) {
    return h.response({
      status: 'fail',
      message: 'Terjadi kegagalan pada server',
    }).code(500);
  }
}


  async deletePlaylistHandler(request, h) {
    try {
      const { id } = request.params;
      const { userId } = request.auth.credentials;

      await this._service.deletePlaylist(id, userId);

      return {
        status: 'success',
        message: 'Playlist berhasil dihapus',
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error instanceof ClientError ? error.message : 'Terjadi kegagalan pada server',
      });
      response.code(error instanceof ClientError ? 404 : 500);
      return response;
    }
  }
}

module.exports = PlaylistsHandler;
