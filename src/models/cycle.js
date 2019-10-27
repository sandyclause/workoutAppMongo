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


// cycleSchema.virtual('workouts', {
//   ref: 'Workout',
//   localField: '_id',
//   foreignField: 'cycleId'
// })

const Cycle = mongoose.model('Cycle', cycleSchema)

module.exports = Cycle