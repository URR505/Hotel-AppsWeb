
const express = require('express');
const sql = require('mssql');
const app = express();
const port = 3000;

// Configuración de la conexión a la base de datos
const dbConfig = {
    user: 'admin',
    password: 'root',
    server: 'localhost',
    database: 'BANCODESANGRE',
    options: {
        encrypt: false, // Usar true si se conecta a un servidor Azure
        trustServerCertificate: false // Usar true si el servidor tiene certificado auto-firmado
    }
};

// Middleware para parsear JSON
app.use(express.json());

// Conectar a la base de datos
sql.connect(dbConfig).then(pool => {
    if (pool.connected) {
        console.log('Conectado a la base de datos SQL Server');
    }

    // Endpoint de ejemplo
    app.get('/api/data', async (req, res) => {
        try {
            const result = await pool.request().query('SELECT * FROM Donantes');
            res.json(result.recordset);
        } catch (err) {
            res.status(500).send(err.message);
        }
    });

    // Iniciar el servidor
    app.listen(port, () => {
        console.log(`Servidor escuchando en el puerto ${port}`);
    });

}).catch(err => {
    console.error('Error al conectar a la base de datos', err);
});
