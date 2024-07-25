import express from 'express';
import hotelsRoutes from './routes/hotels.routes.js';
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();

// Configuración de CORS para permitir solicitudes solo desde una URL específica
const corsOptions = {
  origin: 'https://hotel-frontend-kmfh.onrender.com',
  optionsSuccessStatus: 200, // Para navegadores antiguos o ciertos clientes
  credentials: true, // Permitir el uso de credenciales (cookies, encabezados de autenticación, etc.)
};

app.use(cors(corsOptions));

// Middleware para parsear las peticiones como JSON
app.use(express.json());
app.use(cookieParser());

// Rutas
app.use(hotelsRoutes);
app.use(authRoutes);


export default app;
