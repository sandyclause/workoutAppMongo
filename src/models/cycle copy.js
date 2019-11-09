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
  productId: [String]
}, {
  timestamps: true
})

cycleSchema.pre('save', async function(next) {
  const User = require('./user')

  const cycle = this;
  const userId = cycle.owner;

  const user = await User.findById(userId);
  const workoutTemplate = user.workoutTemplate;


  workoutTemplate.forEach(workout => {
    const workoutName = workout.name;
    const startingWeight = workout.startingWeight;
    
    const newWorkout = new Workout({
      workoutName: workoutName,
      score: -1,
      workingWeight: startingWeight,
      cycleId: cycle._id
    })
    cycle.productId.push(newWorkout._id)
    newWorkout.save();
  });

  next();
})

const Cycle = mongoose.model('Cycle', cycleSchema)

module.exports = Cycle