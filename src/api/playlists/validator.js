const Joi = require('joi');
const ClientError = require('../../utils/errorHandler').ClientError;

const PlaylistPayloadSchema = Joi.object({
  name: Joi.string().required(),
});

class PlaylistsValidator {
  validatePlaylistPayload(payload) {
    const { error } = PlaylistPayloadSchema.validate(payload);
    if (error) throw new ClientError(error.message);
  }
}

module.exports = PlaylistsValidator;
