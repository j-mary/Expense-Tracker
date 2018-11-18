import express from 'express';
import mongoose from 'mongoose';
import Joi from 'joi';
Joi.objectId = require('joi-objectid')(Joi);
import cors from 'cors';
import error from './server/middleware/error';
import expenses from './server/routes/expense-routes';
import users from './server/routes/user-routes';
import auth from './server/routes/auth';
import path from 'path';
import 'express-async-errors';
const app = express();

if (!process.env.expenseTracker_jwtPrivateKey) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined');
  process.exit(1)
}

// set connection string based on env
const connectionString =
  process.env.NODE_ENV == "production" ?
    process.env.expenseTracker_MONGODB_URI :
    'mongodb://localhost:27017/expense-tracker';

mongoose
  .connect(connectionString,
    { useCreateIndex: true, useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.error('Failed to connect to MongoDB...'));

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
