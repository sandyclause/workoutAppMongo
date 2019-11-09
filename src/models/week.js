const mongoose = require('mongoose')
const Workout = require('./workout')

const weekSchema = new mongoose.Schema({
  weekName: {
    type: String,
  },
  completion: {
    type: Number,
  },
  cycleId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'Cycle'
  },
}, {
  timestamps: true
})

weekSchema.post('save', async function(doc, next) {
  const Cycle = require('./cycle')
  const User = require('./user')

  const week = this;
  const cycleId = week.cycleId;
  const parentCycle = await Cycle.findById(cycleId);
  const userId = parentCycle.owner;
  const user = await User.findById(userId);
  const workoutTemplate = user.workoutTemplate;

  workoutTemplate.forEach(workout => {
    const workoutName = workout.name;
    const startingWeight = workout.startingWeight;
    
    const newWorkout = new Workout({
      workoutName: workoutName,
      score: -1,
      workingWeight: startingWeight,
      weekId: week._id,
    })
    newWorkout.save();
  });

  next();
})

const Week = mongoose.model('Week', weekSchema)

module.exports = Week