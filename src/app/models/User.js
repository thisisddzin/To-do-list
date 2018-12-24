const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')

const Todos = require('./Todo')

const Schema = mongoose.Schema

const User = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true
  }
})

User.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }

  this.password = await bcrypt.hash(this.password, 8)
})

User.pre('remove', async function (next) {
  await Todos.remove({ author: this._id })
  next()
})

User.methods = {
  async compareHash (password) {
    await bcrypt.compare(password, this.password)
  }
}

User.statics = {
  generateToken ({ id }) {
    return jwt.sign({ id }, authConfig.secret, { expiresIn: authConfig.ttl })
  }
}

module.exports = mongoose.model('User', User)
