exports.failValidation = (h, message) => {
  return h.response({
    status: 'fail',
    message: message || 'Data tidak valid'
  }).code(400);
};

exports.notFound = (h, message) => {
  return h.response({
    status: 'fail',
    message: message || 'Resource tidak ditemukan'
  }).code(404);
};

exports.serverError = (h, message) => {
  return h.response({
    status: 'error',
    message: message || 'Terjadi kesalahan pada server'
  }).code(500);
};
