const Joi = require('joi')

module.exports = {
  body: {
    name: Joi.string().required(),
    description: Joi.string().required(),
    term: Joi.date().required(),
    priority: Joi.number().required()
  }
}
