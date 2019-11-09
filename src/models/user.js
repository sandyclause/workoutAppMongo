const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Cycle = require('../models/cycle')
const Workout = require('./workout')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error('email is invalid')
      }
    }
  },
  password: {
    type: String,
    minlength: 7,
    validate(value) {
      if (value.toLowerCase().includes('password')) {
        throw new Error ('password cannot contain the word password')
      }
    },
    trim: true,
    required: true,
  },
  workoutTemplate: [{
    name: {
      type: String,
      required: true,
    },
    startingWeight: {
      type: Number,
      required: true,
    },
    weightIncrement: {
      type: Number,
      default: 5,
    }
  }],
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
}, {
  timestamps: true
})

userSchema.virtual('cycles', {
  ref: 'Cycle',
  localField: '_id',
  foreignField: 'owner'
})

userSchema.methods.toJSON = function () {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens

  return userObject
}

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, 'lolz')

  user.tokens = user.tokens.concat({ token })
  await user.save()
  
  return token
}

userSchema.methods.createCycles = async function () {
  const user = this

  for (i = 0; i < 4; i++) {
    const cycle = new Cycle({
      owner: user._id
    })
    await cycle.save();
  }
}

userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({email})
  if (!user) {
    throw new Error('unable to login')
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error('unable to login')
  }

  return user
}

userSchema.pre('save', async function(next) {
  const user = this

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

userSchema.pre('remove', async function (next) {
  
  const Cyclex = require('../models/cycle')
  const user = this;
  const userId = user._id;
  const cyclesInUser = await Cyclex.find({owner: userId});

  try {
    await cyclesInUser.forEach( async (cycle) => {
      await Workout.deleteMany({cycleId: cycle._id})
    })
    console.log('fired2')
    await Cycle.deleteMany({owner: userId});
    next();
  } catch (e) {
    console.log(e)
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User