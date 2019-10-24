const mongoose = require('mongoose')
const validator = require('validator')

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
  // tokens: [{
  //   token: {
  //     type: String,
  //     required: true
  //   }
  // }]
}, {
  timestamps: true
})


const User = mongoose.model('User', userSchema)

module.exports = User