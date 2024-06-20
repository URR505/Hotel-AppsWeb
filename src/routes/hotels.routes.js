import { Router } from 'express'
import { getHotels, getOneHotel, getAvaiableRooms } from '../controllers/hotels.controllers.js'
const router = Router()

router.get("/hoteles", getHotels);

router.get('/hotel/:id', getOneHotel);

router.get('/rooms/:id', getAvaiableRooms);

export default router; 
