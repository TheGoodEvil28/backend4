const Joi = require('joi');
const { ClientError } = require('../../utils/errorHandler');

const PlaylistSongPayloadSchema = Joi.object({
  playlistId: Joi.string().required(),
  songId: Joi.string().required(),
});

class PlaylistSongsValidator {
  validatePlaylistSongPayload(payload) {
    const { error } = PlaylistSongPayloadSchema.validate(payload);
    if (error) throw new ClientError(error.message);
  }
}

module.exports = PlaylistSongsValidator;
