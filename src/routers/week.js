const express = require('express')
const router = new express.Router()
const Week = require('../models/week')
const auth = require('../middleware/auth')

router.get('/weeks/cycle/:cycleId', auth, async (req, res) => {
  const cycleId = req.params.cycleId;

  try {
    const weeks = await Week.find({cycleId})

    res.send(weeks)
  } catch (e) {
    res.status(500).send()
  }
})


module.exports = router