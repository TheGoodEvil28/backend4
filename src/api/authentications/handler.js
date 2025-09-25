const autoBind = require('auto-bind');
const jwt = require('jsonwebtoken');


class AuthenticationsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    autoBind(this);
  }

  async postAuthenticationHandler(request, h) {
    this._validator.validatePostAuthenticationPayload(request.payload);
    const { username, password } = request.payload;

    const userId = await this._service.verifyUserCredential(username, password);
    const accessToken = await this._service.generateAccessToken({ id: userId });
    const refreshToken = await this._service.generateRefreshToken({ id: userId });

    const response = h.response({
      status: 'success',
      data: { accessToken, refreshToken },
    });
    response.code(201);
    return response;
  }


async putAuthenticationHandler(request, h) {
  this._validator.validatePutDeleteAuthenticationPayload(request.payload);
  const { refreshToken } = request.payload;

  // verifikasi refresh token di DB dan validitasnya
  await this._service.verifyRefreshToken(refreshToken);

  // ambil userId dari payload JWT
  const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
  
  // generate access token baru
  const accessToken = await this._service.generateAccessToken({ id: payload.userId });

  return {
    status: 'success',
    data: { accessToken },
  };
}

async generateRefreshToken(user) {
  const payload = { userId: user.id };
  const token = jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, { expiresIn: '7d' });

  // simpan ke DB
  const query = {
    text: 'INSERT INTO authentications(token) VALUES($1)',
    values: [token],
  };
  await pool.query(query); // <-- pastikan ini dieksekusi
  return token;
}


  async deleteAuthenticationHandler(request, h) {
    this._validator.validatePutDeleteAuthenticationPayload(request.payload);
    const { refreshToken } = request.payload;
    await this._service.deleteRefreshToken(refreshToken);

    return {
      status: 'success',
      message: 'Refresh token berhasil dihapus',
    };
  }
}



module.exports = AuthenticationsHandler;
