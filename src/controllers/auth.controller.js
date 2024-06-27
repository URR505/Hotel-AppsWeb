import { getConnection } from '../database/connection.js';
import sql from "mssql";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = 'cf0740a3dd137863e18aaab9d99a84d2219195a17b4487b35e06c24c2c9e414f';
export const registerUser = async (req, res) => {
    const { email, password } = req.body;
    const pool = await getConnection();
  
    try {
      // Verificar si el email ya está registrado
      const checkUser = await pool.request()
        .input('email', sql.VarChar, email)
        .query('SELECT * FROM USERS WHERE email = @Email');
  
      if (checkUser.recordset.length > 0) {
        // Si el email ya existe, devolver un error
        return res.status(400).json({ isSuccess: false, error: 'Email already exists' });
      }
  
      // Si el email no está registrado, proceder con el registro
      const hashedPassword = await bcrypt.hash(password, 10);
  
      await pool.request()
        .input('email', sql.VarChar, email)
        .input('password', sql.VarChar, hashedPassword)
        .query('INSERT INTO USERS (email, password) VALUES (@Email, @Password)');
  
      res.status(201).json({ isSuccess: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ isSuccess: false, error: 'Internal Server Error' });
    }
  };

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const pool = await getConnection();

  try {
    const result = await pool.request()
      .input('email', sql.VarChar, email)
      .query('SELECT * FROM USERS WHERE email = @Email');

    const user = result.recordset[0];

    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({ isSuccess: false, error: 'Credenciales Invalidas' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ isSuccess: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ isSuccess: false, error: 'Internal Server Error' });
  }
};