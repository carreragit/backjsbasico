// app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sql = require('mssql');

const app = express();
app.use(cors());
app.use(express.json());

// Configuración de la base de datos
const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: false
  }
};

// Conexión y endpoint de ejemplo
app.get('/api/products', async (req, res) => {
  try {
    const pool = await sql.connect(dbConfig);
    const result = await pool.request().query('SELECT * FROM Products');
    res.json(result.recordset);
  } catch (err) {
    console.error('Error al obtener productos:', err);
    res.status(500).send('Error al obtener productos');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
module.exports = app;
