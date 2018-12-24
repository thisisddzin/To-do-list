const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const Schema = mongoose.Schema

const Todo = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  term: {
    type: Date,
    required: true
  },
  priority: {
    type: Number,
    required: true
  },
  completed: {
    type: Boolean,
    default: 0,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

Todo.plugin(mongoosePaginate)

module.exports = mongoose.model('Todo', Todo)
