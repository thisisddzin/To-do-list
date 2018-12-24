const Joi = require('joi')

module.exports = {
  body: {
    name: Joi.string(),
    description: Joi.string(),
    term: Joi.date(),
    priority: Joi.number()
  }
}
