// auth.middleware.js
import jwt from 'jsonwebtoken';


const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateToken = (req, res, next) => {
  // Leer el token de las cookies
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send('No token provided');
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};
