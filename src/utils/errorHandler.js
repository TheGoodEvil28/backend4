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


class InvariantError extends Error { constructor(message){super(message);this.name='InvariantError';}}
class NotFoundError extends Error { constructor(message){super(message);this.name='NotFoundError';}}

const failValidation = (h, message) => h.response({status:'fail',message}).code(400);
const notFound = (h,message) => h.response({status:'fail',message}).code(404);
const serverError = (h) => h.response({status:'error',message:'Terjadi kesalahan pada server'}).code(500);

module.exports = { failValidation, notFound, serverError, InvariantError, NotFoundError };
