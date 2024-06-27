
import express from 'express';
import hotelsRoutes from './routes/hotels.routes.js';
import authRoutes from './routes/auth.routes.js';

import cors from 'cors';

const app = express();

// Configuración de CORS para permitir todos los orígenes
app.use(cors());

// Middleware para parsear las peticiones como JSON
app.use(express.json());

// Rutas
app.use(hotelsRoutes);
app.use(authRoutes);


export default app;

