const Joi = require('joi');
const ClientError = require('../../utils/errorHandler').ClientError;

const PostAuthSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const PutDeleteAuthSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

class AuthenticationsValidator {
  validatePostAuthenticationPayload(payload) {
    const { error } = PostAuthSchema.validate(payload);
    if (error) throw new ClientError(error.message);
  }

  validatePutDeleteAuthenticationPayload(payload) {
    const { error } = PutDeleteAuthSchema.validate(payload);
    if (error) throw new ClientError(error.message);
  }
}

module.exports = AuthenticationsValidator;
