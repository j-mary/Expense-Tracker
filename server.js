const express = require('express')
const mongoose = require('mongoose')
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi);
const cors = require('cors');
const error = require('./server/middleware/error');
const expenses = require('./server/routes/expense-routes');
const users = require('./server/routes/user-routes');
const auth = require('./server/routes/auth');
const path = require('path');
require('express-async-errors');
const { mongoURI } = require('./server/config/database');
const app = express();

if (!process.env.expenseTracker_jwtPrivateKey) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1)
}

mongoose
  .connect(mongoURI,
    { useCreateIndex: true, useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.error('Failed to connect to MongoDB...'));

// serve static frontend assets
app.use(express.static(__dirname + '/dist/expense-tracker'))
app.use(cors());
app.use(express.json());
app.use('/api/expenses', expenses);
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use(error);

// redirect all routes to the front
app.get('/*', (req, res) => res.sendFile(path.join(__dirname + '/dist/expense-tracker/index.html')));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
