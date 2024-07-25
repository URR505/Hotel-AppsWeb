import { getConnection } from '../database/connection.js';
import sql from "mssql";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
export const registerUser = async (req, res) => {
  const { nombre, apellidos, email, password } = req.body;
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
      .input('nombre', sql.VarChar, nombre)
      .input('apellidos', sql.VarChar, apellidos)
      .input('email', sql.VarChar, email)
      .input('password', sql.VarChar, hashedPassword)
      .query('INSERT INTO USERS (nombre, apellidos, email, password) VALUES (@nombre, @apellidos ,@Email, @Password)');

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

    const token = jwt.sign({ id: user.id, nombre: user.nombre, apellidos: user.apellidos, email: user.email }, JWT_SECRET, { expiresIn: "1h" });

    // Enviar el token en una cookie HTTP-only
    res.cookie('token', token, {
      httpOnly: true,
      secure: true, // Solo si usas HTTPS
      sameSite: 'None' // Necesario para cookies de terceros
    });
    res.status(200).json({ isSuccess: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ isSuccess: false, error: 'Internal Server Error' });
  }
};



export const getProfile = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).send('No token provided');
  }

  try {
    const user = jwt.verify(token, JWT_SECRET);
    res.status(200).json({ id: user.id, nombre: user.nombre, apellidos: user.apellidos, email: user.email, });
  } catch (err) {
    res.status(400).send('Invalid token');
  }
};

export const logoutUser = async (req, res) => {
  // Limpiar la cookie HTTP-only
  res.clearCookie('token');

  res.status(204).json({ isSuccess: true, message: 'Logout successful' });
};

export const verifyToken = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ valid: false });
  }

  try {
    jwt.verify(token, JWT_SECRET);
    return res.json({ valid: true });
  } catch (err) {
    return res.json({ valid: false });
  }
};


