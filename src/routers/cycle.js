const express = require('express')
const router = new express.Router()
const Cycle = require('../models/cycle')
const auth = require('../middleware/auth')

router.post('/cycles', auth, async (req, res) => {
  const cycle = new Cycle({
    ...req.body,
    owner: req.user._id
  })

  try {
    await cycle.save()
    res.status(201).send(cycle)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/cycles', auth, async (req, res) => {

  try {
    await req.user.populate({
      path: 'cycles',
    }).execPopulate()
    res.send(req.user.cycles)
  } catch (e) {
    res.status(500).send()
  }
})

router.delete('/cycles/:id', auth, async (req, res) => {
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