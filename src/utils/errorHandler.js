// src/utils/errorHandler.js

// Response handler untuk client
const failValidation = (h, message = 'Data tidak valid') => {
  return h.response({
    status: 'fail',
    message,
  }).code(400);
};

const notFound = (h, message = 'Resource tidak ditemukan') => {
  return h.response({
    status: 'fail',
    message,
  }).code(404);
};

const serverError = (h, message = 'Terjadi kesalahan pada server') => {
  return h.response({
    status: 'error',
    message,
  }).code(500);
};

// Custom error class untuk service
class InvariantError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvariantError';
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}

module.exports = {
  failValidation,
  notFound,
  serverError,
  InvariantError,
  NotFoundError,
};
