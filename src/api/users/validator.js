const Joi = require('joi');
const ClientError = require('../../utils/errorHandler').ClientError;

const UserPayloadSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  fullname: Joi.string().required(),
});

class UsersValidator {
  validateUserPayload(payload) {
    const { error } = UserPayloadSchema.validate(payload);
    if (error) {
      throw new ClientError(error.message);
    }
  }
}

module.exports = UsersValidator;
