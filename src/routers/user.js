const express = require('express')
const router = new express.Router()
const User = require('../models/user')

router.post('/users', async (req, res) => {
  const user = new User(req.body)

  try {
    await user.save()
    
    res.status(201).send({user})
  } catch (e) {
    res.status(400).send(e)
  }
})

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    
    res.status(200).send({users})
  } catch (e) {
    res.status(400).send(e)
  }
})

router.delete('/user/:id', async (req, res) => {
  const userId = req.params.id;
  
  try {
    const user = await User.findByIdAndDelete(userId);
    
    if (!user) {
      return res.send(404).send();
    }
    res.send({user})
  } catch (e) {
    res.status(400).send(e)
  }
})

module.exports = router