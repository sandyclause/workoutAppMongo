const mongoose = require('mongoose')
const validator = require('validator')

const CycleSchema = new mongoose.Schema({
  cycleName: {
    type: Date,
  },
  email: {
    type: Number,
  }
}, {
  timestamps: true
})


const Cycle = mongoose.model('Cycle', CycleSchema)

module.exports = Cycle