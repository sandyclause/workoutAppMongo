const mongoose = require('mongoose')
const validator = require('validator')

const CycleSchema = new mongoose.Schema({
  cycleName: {
    type: Date,
  },
  completion: {
    type: Number,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User'
  }
}, {
  timestamps: true
})


const Cycle = mongoose.model('Cycle', CycleSchema)

module.exports = Cycle