const express = require('express')
const router = new express.Router()
const Workout = require('../models/workout')
const auth = require('../middleware/auth')
const Cycle = require('../models/cycle')

router.post('/workouts/:cycleId', auth, async (req, res) => {
  const cycleId = req.params.cycleId;

  const workout = new Workout({
    ...req.body,
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

router.patch('/workouts/:id', auth, async (req, res) => {
  const workoutId = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ['score'];
  const updatesValid = updates.every((update) => allowedUpdates.includes(update));

  if (!updatesValid) {
    return res.status(400).send({error: 'Invalid updates'});
  }

  try {
    const workout = await Workout.findById(workoutId);
  
    updates.forEach((update) => {
      return workout[update] = req.body[update]
    });

    await workout.save();
    res.send(workout);
  } catch (e) {
    res.status(400).send(e);
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