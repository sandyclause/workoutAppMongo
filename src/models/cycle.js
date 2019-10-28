const mongoose = require('mongoose')
const Workout = require('./workout')

const cycleSchema = new mongoose.Schema({
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
  },
}, {
  timestamps: true
})

cycleSchema.pre('save', async function(next) {
  const cycle = this

  for (i = 0; i < 4; i++) {
    const workout = new Workout({
      workoutName: 'test' + i,
      score: 11,
      workingWeight: 100,
      cycleId: cycle._id
    })
    cycle.productId.push(workout._id)
    await workout.save();
  }
  next()
})

const Cycle = mongoose.model('Cycle', cycleSchema)

module.exports = Cycle