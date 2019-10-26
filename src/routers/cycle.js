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


module.exports = router