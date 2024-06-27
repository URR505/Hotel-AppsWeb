import { Router } from 'express'
import { getHotels, getOneHotel, getAvaiableRooms } from '../controllers/hotels.controllers.js'
import { authenticateToken } from '../middleware/auth.middleware.js';
const router = Router()

router.get('/api/hoteles', authenticateToken, getHotels);
router.get('/api/hotel/:id', authenticateToken, getOneHotel);
router.get('/api/rooms/:id', authenticateToken, getAvaiableRooms);

export default router; 
