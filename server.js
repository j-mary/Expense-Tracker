import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import error from './server/middleware/error';
import expenses from './server/routes/expense-routes';
import 'express-async-errors';

const app = express();

mongoose
  .connect(
    'mongodb://localhost:27017/expense-tracker',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.error('Failed to connect to MongoDB...'));

app.use(cors());
app.use(express.json());
app.use('/api/expenses', expenses);
app.use(error);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
