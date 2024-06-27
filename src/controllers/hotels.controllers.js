import { getConnection } from '../database/connection.js';
import sql from "mssql"


export const getHotels = async (req, res) => {
  const pool = await getConnection()
  const result = await pool.query('SELECT * FROM HOTELES')
  res.json({value: result.recordset})
}

export const getOneHotel = async (req, res) => {
  const pool = await getConnection()
  const result = await pool
    .request()
    .input("id", sql.Int, req.params.id)
    .query("SELECT * FROM HOTELES WHERE id_hotel = @id");
  res.json(result.recordset[0]);
}

export const getAvaiableRooms = async (req, res) => {
  const pool = await getConnection()
  const result = await pool
    .request()
    .input("id", sql.Int, req.params.id)
    .query("SELECT * FROM HABITACIONESDISPONIBLES WHERE Id_hotel = @id")
  res.json(result.recordset[0])
}
