// Response helpers
const failValidation = (h, message = 'Data tidak valid') =>
  h.response({ status: 'fail', message }).code(400);

const notFound = (h, message = 'Resource tidak ditemukan') =>
  h.response({ status: 'fail', message }).code(404);

const serverError = (h, message = 'Terjadi kesalahan pada server') =>
  h.response({ status: 'error', message }).code(500);

// Custom errors
class ClientError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.name = 'ClientError';
    this.statusCode = statusCode;
  }
}

class NotFoundError extends ClientError {
  constructor(message) {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

class InvariantError extends ClientError {
  constructor(message) {
    super(message, 400);
    this.name = 'InvariantError';
  }
}

module.exports = {
  failValidation,
  notFound,
  serverError,
  ClientError,
  NotFoundError,
  InvariantError,
};
