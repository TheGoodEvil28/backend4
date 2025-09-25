const { nanoid } = require('nanoid');
const AlbumService = require('../../services/AlbumService');
const { AlbumPayloadSchema } = require('./validator');

const service = new AlbumService();

const { failValidation, notFound, serverError } = require('../../utils/errorHandler');

// Tambah Album
exports.addAlbumHandler = async (request, h) => {
  try {
    const { error } = AlbumPayloadSchema.validate(request.payload);
    if (error) return failValidation(h, error.message);

    const { name, year } = request.payload;
    const id = `album-${nanoid(16)}`;

    await service.addAlbum({ id, name, year });

    return h.response({
      status: 'success',
      message: 'Album berhasil ditambahkan',
      data: { albumId: id }
    }).code(201);

  } catch (err) {
    console.error(err);
    return serverError(h);
  }
};

// Dapatkan Album berdasarkan ID
exports.getAlbumByIdHandler = async (request, h) => {
  try {
    const album = await service.getAlbumById(request.params.id);
    if (!album) return notFound(h, 'Album tidak ditemukan');
    return h.response({ status: 'success', data: { album } }).code(200);
  } catch (err) {
    console.error(err);
    return serverError(h);
  }
};

// Update Album
exports.updateAlbumHandler = async (request, h) => {
  try {
    const { error } = AlbumPayloadSchema.validate(request.payload);
    if (error) return failValidation(h, error.message);

    const { id } = request.params;
    const { name, year } = request.payload;

    const updated = await service.updateAlbum(id, { name, year });
    if (!updated) return notFound(h, 'Album tidak ditemukan');

    return h.response({ status: 'success', message: 'Album berhasil diperbarui' }).code(200);
  } catch (err) {
    console.error(err);
    return serverError(h);
  }
};

// Hapus Album
exports.deleteAlbumHandler = async (request, h) => {
  try {
    const { id } = request.params;

    const deleted = await service.deleteAlbum(id);
    if (!deleted) return notFound(h, 'Album tidak ditemukan');

    return h.response({ status: 'success', message: 'Album berhasil dihapus' }).code(200);
  } catch (err) {
    console.error(err);
    return serverError(h);
  }
};
