import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import Joi from 'joi';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 1024
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
})

userSchema.methods.generateAuthToken = function () {
  let expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  const token = jwt.sign({
    _id: this._id,
    isAdmin: this.isAdmin,
    name: this.name,
    email: this.email,
    exp: parseInt(expiry.getTime() / 1000),
  }, process.env.expenseTracker_jwtPrivateKey);
  return token
}

const User = mongoose.model('User', userSchema)

function validateUser(user) {
  const schema = {
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(6).max(255).required()
  };

  return Joi.validate(user, schema);
}

export default { User, validateUser }