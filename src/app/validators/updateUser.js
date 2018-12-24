const Joi = require('joi')

module.exports = {
  body: {
    name: Joi.string(),
    email: Joi.string().email(),
    password: Joi.string()
  }
}
