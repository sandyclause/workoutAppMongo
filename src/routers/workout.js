const express = require('express')
const router = new express.Router()
const Workout = require('../models/workout')
const auth = require('../middleware/auth')
const Cycle = require('../models/cycle')

router.post('/workouts/:cycleId', auth, async (req, res) => {
  const cycleId = req.params.cycleId;

  const workout = new Workout({
    workoutName: 'test',
    score: 1,
    workingWeight: 10,
    cycleId,
  })

  try {
    await workout.save()
    res.status(201).send(workout)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/workouts/cycle/:cycleId', auth, async (req, res) => {
  const cycleId = req.params.cycleId;

  try {
    const workouts = await Workout.find({cycleId})

    res.send(workouts)
  } catch (e) {
    res.status(500).send()
  }
})

router.delete('/workouts/:id', auth, async (req, res) => {
  const cycleId = req.params.id;

  try {
    const cycle = await Cycle.findByIdAndDelete(cycleId);

    if (!cycle) {
      res.status(404).send()
    }
    res.status(201).send(cycle)
  } catch (e) {
    res.status(400).send(e)
  }
})


module.exports = router