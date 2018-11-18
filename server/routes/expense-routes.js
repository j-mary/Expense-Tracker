import auth from '../middleware/auth';
import express from 'express';
import axios from 'axios';
import { Expense, validateExpense } from '../model/expense-model';
import 'express-async-errors';

const router = express.Router();

router.get('/', auth, async (req, res) => {
  const expenses = await Expense.find({ user: req.user._id }).sort('date');
  res.send(expenses);
});

router.get('/:id', auth, async (req, res) => {
  const expense = await Expense.findOne({ _id: req.params.id });
  if (expense.user !== req.user._id) return res.status(400).send('Not Authorized');
  res.send(expense);
});

router.post('/', auth, async (req, res) => {
  // save the currency char in a vaiable
  let currencyChar;
  if (req.body.value.includes(" ")) {
    currencyChar = req.body.value.split(" ").pop();
  }
  // cast the expense value to number
  const valueFromBody = req.body.value.split(" ").shift();
  let expenseValue
  if (valueFromBody.includes(',')) {
    expenseValue = +req.body.value.split(",").shift();
  } else {
    expenseValue = +valueFromBody
  }
  // set 'value' in the request body to number, to pass validation
  req.body.value = expenseValue;
  // if all went well -> validate input
  const { error } = validateExpense(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // call external api to get currency rate
  if (currencyChar) {
    const rate = await axios.get(`http://free.currencyconverterapi.com/api/v5/convert?q=${currencyChar}_GBP&compact=y`);
    // set value in request body to converted rate
    req.body.value = financial(rate.data[`${currencyChar}_GBP`].val * expenseValue);
  }
  // create new expense
  const { date, value, reason } = req.body;
  const { _id } = req.user;
  const expense = new Expense({
    date,
    value,
    reason,
    user: _id
  });
  // save & return
  await expense.save();
  res.send(expense);
});

router.put('/:id', auth, async (req, res) => {
  // validate input
  const { error } = validateExpense(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  // update expense
  const { date, value, reason } = req.body;
  const expense = await Expense.findOneAndUpdate(
    { _id: req.params.id },
    {
      date,
      value,
      reason
    },
    { new: true }
  );
  // return updated expense
  if (!expense)
    return res.status(404).send('The expense with given ID was not found');
  res.send(expense);
});

router.delete('/:id', auth, async (req, res) => {
  const expense = await Expense.findOneAndDelete({ _id: req.params.id });
  if (!expense)
    return res.status(404).send('The expense with given ID was not found');
  res.send({ message: 'deleted successfully' });
});

function financial(x) {
  return Number.parseFloat(x).toFixed(2);
}

export default router;
