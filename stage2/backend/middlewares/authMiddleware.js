const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET;

const authenticateStore = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized. Token missing.' });
  }
  console.log(authHeader);
  const token = authHeader.split(' ')[1];
  console.log('Token:', token); // Log the token for debugging
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.store = decoded; // make store info available in req
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token.' });
  }
};

module.exports = authenticateStore;
