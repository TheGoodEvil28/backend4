const autoBind = require('auto-bind');
const { ClientError } = require('../../utils/errorHandler');

class PlaylistSongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    autoBind(this);
  }

 async postPlaylistSongHandler(request, h) {
    this._validator.validatePlaylistSongPayload(request.payload);

    const { playlistId, songId } = request.payload;
    const { userId } = request.auth.credentials; // <- make sure JWT auth is applied

    await this._service.addSongToPlaylist({ playlistId, songId, owner: userId });

    return h.response({
        status: 'success',
        message: 'Lagu berhasil ditambahkan ke playlist',
    }).code(201);
}



  async deletePlaylistSongHandler(request, h) {
    this._validator.validatePlaylistSongPayload(request.payload);
    const { playlistId, songId } = request.payload;
    const { userId } = request.auth.credentials; // <-- JWT user

    await this._service.removeSongFromPlaylist({ playlistId, songId, userId });

    return {
      status: 'success',
      message: 'Lagu berhasil dihapus dari playlist',
    };
  }

  async getPlaylistSongsHandler(request, h) {
    const { id: playlistId } = request.params;

    // Get playlist info (name, owner)
    const playlist = await this._service.getPlaylistById(playlistId);
    if (!playlist) {
        return h.response({
            status: 'fail',
            message: 'Playlist tidak ditemukan',
        }).code(404);
    }

    // Get songs
    const songs = await this._service.getSongsFromPlaylist(playlistId);

    return {
        status: 'success',
        data: {
            playlist: {
                id: playlist.id,
                name: playlist.name,
                username: playlist.username,
                songs,
            }
        }
    };
}

}

module.exports = PlaylistSongsHandler;
