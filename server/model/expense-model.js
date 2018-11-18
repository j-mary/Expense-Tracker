const mongoose = require('mongoose')
const Joi = require('joi')

const expenseSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  reason: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true
  }
});

const Expense = mongoose.model('Expense', expenseSchema);

function validateExpense(expense) {
  const schema = {
    date: Joi.date().required(),
    value: Joi.number().required(),
    reason: Joi.string().required()
  };
  return Joi.validate(expense, schema);
}

module.exports = { Expense, validateExpense };
