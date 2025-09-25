const Joi = require('joi');

exports.AlbumPayloadSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().required()
});
