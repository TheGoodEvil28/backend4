const { nanoid } = require('nanoid');
const SongService = require('../../services/SongService');
const { SongPayloadSchema } = require('./validator');

const service = new SongService();
const { failValidation, notFound, serverError } = require('../../utils/errorHandler');

exports.addSongHandler = async (request, h) => {
  try {
    const { error } = SongPayloadSchema.validate(request.payload);
    if (error) return failValidation(h, error.message);

    const { title, year, performer, genre, duration, albumId } = request.payload;
    const id = `song-${nanoid(16)}`;

    await service.addSong({ id, title, year, performer, genre, duration, albumId });

    return h.response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan',
      data: { songId: id }
    }).code(201);

  } catch (err) {
    console.error(err);
    return serverError(h);
  }
};

exports.getAllSongsHandler = async (request, h) => {
  try {
    const songs = await service.getAllSongs();
    return h.response({ status: 'success', data: { songs } }).code(200);
  } catch (err) {
    console.error(err);
    return serverError(h);
  }
};

exports.getSongByIdHandler = async (request, h) => {
  try {
    const song = await service.getSongById(request.params.id);
    if (!song) return notFound(h, 'Lagu tidak ditemukan');
    return h.response({ status: 'success', data: { song } }).code(200);
  } catch (err) {
    console.error(err);
    return serverError(h);
  }
};

exports.updateSongHandler = async (request, h) => {
  try {
    const { error } = SongPayloadSchema.validate(request.payload);
    if (error) return failValidation(h, error.message);

    const { id } = request.params;
    const { title, year, performer, genre, duration, albumId } = request.payload;

    const updated = await service.updateSong(id, { title, year, performer, genre, duration, albumId });
    if (!updated) return notFound(h, 'Lagu tidak ditemukan');

    return h.response({ status: 'success', message: 'Lagu berhasil diperbarui' }).code(200);
  } catch (err) {
    console.error(err);
    return serverError(h);
  }
};

exports.deleteSongHandler = async (request, h) => {
  try {
    const { id } = request.params;

    const deleted = await service.deleteSong(id);
    if (!deleted) return notFound(h, 'Lagu tidak ditemukan');

    return h.response({ status: 'success', message: 'Lagu berhasil dihapus' }).code(200);
  } catch (err) {
    console.error(err);
    return serverError(h);
  }
};
