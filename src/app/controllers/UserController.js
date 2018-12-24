const User = require('../models/User')

class UserController {
  async create (req, res) {
    if (await User.findOne({ email: req.body.email })) {
      return res.json({ error: 'E-mail already registered' })
    }

    const user = await User.create(req.body)

    return res.json(user)
  }

  async show (req, res) {
    const user = await User.findById(req.params.id)

    return res.json(user)
  }

  async list (req, res) {
    const listUsers = await User.find()

    return res.json(listUsers)
  }

  async update (req, res) {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    return res.json(user)
  }

  async destroy (req, res) {
    const user = await User.findById(req.params.id)

    if (!user) {
      return res.json({ error: 'User not found' })
    }

    user.remove()

    return res.send('User deleted successfully')
  }
}

module.exports = new UserController()
