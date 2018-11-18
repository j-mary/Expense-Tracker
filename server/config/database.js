if (process.env.NODE_ENV = 'development') {
  module.exports = { mongoURI: process.env.expenseTracker_MONGODB_URI }
} else {
  module.exports = { mongoURI: 'mongodb://localhost:27017/expense-tracker' }
}