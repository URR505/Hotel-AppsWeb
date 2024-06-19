import { Router } from 'express';
import { getConnection } from '../database/connection.js';


export const getHotels = async (req, res) => {
  const pool = await getConnection()

  const result = await pool.query('SELECT * FROM VerHoteles')

  res.json(result.recordset)
}
