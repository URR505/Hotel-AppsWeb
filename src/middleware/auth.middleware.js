// auth.middleware.js
import jwt from 'jsonwebtoken';


const JWT_SECRET = 'cf0740a3dd137863e18aaab9d99a84d2219195a17b4487b35e06c24c2c9e414f';

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
