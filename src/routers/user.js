const express = require('express')
const router = new express.Router()
const User = require('../models/user')

router.post('/users', async (req, res) => {
  const user = new User(req.body)

  console.log(user)
  try {
    await user.save()

    const token = await user.generateAuthToken();
    
    res.status(201).send({user, token})
  } catch (e) {
    res.status(400).send(e)
  }
})

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findByCredentials(req.body.email, req.body.password)
    const token = await user.generateAuthToken()
    res.send({user, token})
  } catch (e) {
    res.status(400).send()
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

router.get('/users/:id', async (req, res) => {
  const userId = req.params.id;
  
  try {
    const user = await User.findById(userId);

    if (!user) {
      res.status(404).send()
    }
    
    res.status(200).send(user)
  } catch (e) {
    res.status(400).send(e)
  }
})

router.patch('/users/:id', async (req, res) => {
  const userId = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password'];
  const updatesValid = updates.every((update) => allowedUpdates.includes(update));

  if (!updatesValid) {
    return res.status(400).send({error: 'Invalid updates'});
  }

  try {
    const user = await User.findByIdAndUpdate(userId, req.body, { new: true, runValidators: true});

    if (!user) {
      return res.status(404).send();
    }

    res.send(user);
  } catch (e) {
    res.status(400).send(e)
  }
})

router.delete('/user/:id', async (req, res) => {
  const userId = req.params.id;
  
  try {
    const user = await User.findByIdAndDelete(userId);
    
    if (!user) {
      return res.status(404).send();
    }
    res.send({user})
  } catch (e) {
    res.status(400).send(e)
  }
})

module.exports = router