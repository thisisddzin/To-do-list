const express = require('express')
const validate = require('express-validation')
const handle = require('express-async-handler')

const routes = express.Router()

const controller = require('./app/controllers')
const validator = require('./app/validators')

const authMiddleware = require('./app/middlewares/auth.js')
// const adminMiddleware = require('./app/middlewares/admin')

routes.get('/', (req, res) => {
  return res.send('Servidor ligado!')
})

routes.use('/app', authMiddleware)

// *** Session Route ***

routes.post(
  '/signin',
  validate(validator.createSession),
  handle(controller.SessionController.index)
)

// *******************
// *** User Routes ***
// *******************

routes.post(
  '/create_users',
  validate(validator.createUser),
  handle(controller.UserController.create)
)
routes.get('/list_users', handle(controller.UserController.list))
// In this point of User routes on, are need authentication
routes.put(
  '/app/update_users/:id',
  validate(validator.updateUser),
  handle(controller.UserController.update)
)
routes.delete(
  '/app/remove_users/:id',
  handle(controller.UserController.destroy)
)

// ********************
// *** Todos Routes ***
// ********************
// All routes of Todos are need authentication

routes.post(
  '/app/create_todos',
  validate(validator.createTodo),
  handle(controller.TodoController.create)
)
routes.get('/app/list_todos', handle(controller.TodoController.list))
routes.put(
  '/app/update_todos/:id',
  validate(validator.updateTodo),
  handle(controller.TodoController.update)
)
routes.delete(
  '/app/remove_todos/:id',
  handle(controller.TodoController.destroy)
)
routes.get(
  '/app/todo_completed/:id',
  handle(controller.TodoController.complete)
)

module.exports = routes
