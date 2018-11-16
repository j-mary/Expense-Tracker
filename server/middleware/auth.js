import jwt from 'jsonwebtoken';

function auth(req, res, next) {
  const token = req.header('x-auth-token')
  if (!token) return res.status(401).send('Acces denied. No token provided.')

  try {
    const decoded = jwt.verify(token, process.env.expenseTracker_jwtPrivateKey)
    req.user = decoded
    next()
  }
  catch (ex) {
    res.status(400).send('Invalid token')
  }
}

export default auth