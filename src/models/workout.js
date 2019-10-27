const mongoose = require('mongoose')
const validator = require('validator')

const workoutSchema = new mongoose.Schema({
  workoutName: {
    type: String,
    required: true,
    trim: true
  },
  score: {
    type: Number,
    required: true,
  },
  workingWeight: {
    type: Number,
    required: true,
  },
  cycleId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  }
}, {
  timestamps: true
})


const Workout = mongoose.model('Workout', workoutSchema)

module.exports = Workout