import { Router } from 'express'
import { getHotels } from '../controllers/hotels.controllers.js'
const router = Router()

router.get("/hoteles", getHotels);

router.get('/hoteles/:id', (req, res) => {
  res.send('obteniendo un solo hotel')
})

export default router; 
