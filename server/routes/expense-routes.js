import auth from '../middleware/auth';
import express from 'express';
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
  // validate input
  const { error } = validateExpense(req.body);
  if (error) return res.status(400).send(error.details[0].message);
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

export default router;
