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

  res.json(result.recordset)
}

export const createVenta = async (req, res) => {
  const { Id_hotel, Id_usuario, cantidadHab, fechaEntrada, fechaSalida } = req.body;

  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input('Id_hotel', sql.Int, Id_hotel)
      .input('Id_usuario', sql.Int, Id_usuario)
      .input('cantidadHab', sql.Int, cantidadHab)
      .input('fechaEntrada', sql.Date, fechaEntrada)
      .input('fechaSalida', sql.Date, fechaSalida)
      .query(`
        EXEC InsertarVentaYActualizarHabitacionesDisponibles
          @Id_hotel,
          @Id_usuario,
          @cantidadHab,
          @fechaEntrada,
          @fechaSalida
      `);

    res.status(201).json({ message: result.recordset[0].message });
  } catch (error) {
    console.error('Error al crear la venta:', error.message);
    res.status(500).json({ error: 'Error al crear la venta' });
  }
};

export const getListVentas = async (req, res) => {
  const pool = await getConnection()
  const result = await pool
  .request()
  .input("id", sql.Int, req.params.id)
  .query("SELECT * FROM Reservacion WHERE id_usuario = @id")
  res.json(result.recordset)
}