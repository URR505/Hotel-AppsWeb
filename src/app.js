import express from 'express';
import hotelsRoutes from './routes/hotels.routes.js';
import cors from 'cors';

const app = express()
const corsOptions = {
  origin: 'http://localhost:4200', // Permite solo este origen
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(hotelsRoutes)
app.use(express.json())
export default app
