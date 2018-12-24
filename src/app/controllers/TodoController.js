const Todo = require('../models/Todo')

class TodoController {
  async create (req, res) {
    const todo = await Todo.create({ ...req.body, author: req.userId })

    return res.json(todo)
  }

  async show (req, res) {
    const todo = await Todo.findById(req.params.id)

    return res.json(todo)
  }

  async list (req, res) {
    const filters = { author: req.userId }

    if (req.query.completed) {
      filters.completed = {}

      filters.completed.$eq = req.query.completed
    }

    const listTodos = await Todo.paginate(filters, {
      page: req.query.page || 1,
      limit: 20,
      sort: '-createdAt',
      populate: ['author']
    })

    if (!listTodos) {
      res.json({ message: 'You not have anymore todo list' })
    }

    return res.json(listTodos)
  }

  async update (req, res) {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    return res.json(todo)
  }

  async destroy (req, res) {
    const todo = await Todo.findById(req.params.id)

    if (todo.author != req.userId || !todo) {
      return res.send('Este todo não existe.')
    }

    return res.send('Todo list deleted successfully')
  }

  async complete (req, res) {
    const todo = await Todo.findById(req.params.id)

    if (todo.author != req.userId || !todo) {
      return res.json({ error: 'todo não existe.' })
    }

    await Todo.findByIdAndUpdate(
      req.params.id,
      { completed: true },
      { new: true }
    )

    return res.json(todo)
  }
}

module.exports = new TodoController()
