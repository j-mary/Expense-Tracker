import mongoose from 'mongoose';
import Joi from 'joi';

const expenseSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  value: {
    type: String,
    required: true
  },
  reason: {
    type: String,
    required: true
  }
});

const Expense = mongoose.model('Expense', expenseSchema);

function validateExpense(expense) {
  const schema = {
    date: Joi.date().required(),
    value: Joi.string().required(),
    reason: Joi.string().required()
  };
  return Joi.validate(expense, schema);
}

export { Expense, validateExpense };
