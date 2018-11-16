import auth from '../middleware/auth';
import admin from '../middleware/admin';
import _ from 'lodash';
import bcrypt from 'bcrypt';
import express from 'express';
const router = express.Router()

import { User, validateUser } from '../model/user-model';

router.get('/profile', [auth, admin], async (req, res) => {
  // get user -> exclude user password
  const user = await User.findById(req.user._id).select('-password')
  res.send(user)
})

router.post('/register', async (req, res) => {
  // validate user input
  const { error } = validateUser(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  // check if user already exists
  let user = await User.findOne({ email: req.body.email })
  if (user) return res.status(400).send('User already registered')
  // else -> create new user
  user = new User(_.pick(req.body, ['name', 'email', 'password']))
  // hash password
  const salt = await bcrypt.genSalt(10)
  user.password = await bcrypt.hash(user.password, salt)
  // save & return user with token
  await user.save()
  const token = user.generateAuthToken()
  res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']))
})

export default router