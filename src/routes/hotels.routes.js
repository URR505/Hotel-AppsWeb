import { Router } from 'express'
import { getHotels, getOneHotel, getAvaiableRooms, createVenta, getListVentas } from '../controllers/hotels.controllers.js'
import { authenticateToken } from '../middleware/auth.middleware.js';
const router = Router()

router.get('/api/hoteles', getHotels);
router.get('/api/hotel/:id', authenticateToken, getOneHotel);
router.get('/api/hotel/rooms/:id', authenticateToken, getAvaiableRooms);
router.get('/api/ventas/lista/:id', authenticateToken, getListVentas)
router.post('/api/hotel/venta', authenticateToken, createVenta);


export default router; 
