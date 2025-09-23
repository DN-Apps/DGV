require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'https://qa-dgv.ned-it.de',
  credentials: true
}));

// MySQL: Connection Pool
const pool = mysql.createPool({
  host:     process.env.DB_HOST,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Health (prüft DB erreichbar, blockiert aber nicht den Start)
app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', env: process.env.NODE_ENV || 'qa' });
  } catch (err) {
    res.status(500).json({ status: 'db_error', message: err.message });
  }
});

// Firmen abrufen
app.get('/api/firmen', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM firmen');
    res.json(rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Firma anlegen
app.post('/api/firmen', async (req, res) => {
  const { name, adresse } = req.body;
  try {
    await pool.execute('INSERT INTO firmen (name, adresse) VALUES (?, ?)', [name, adresse]);
    res.status(201).send('Firma hinzugefügt');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Benutzerdaten anlegen
app.post('/api/daten', async (req, res) => {
  const { vorname, nachname, wunschposition, firmaId } = req.body;
  try {
    await pool.execute(
      'INSERT INTO benutzerdaten (vorname, nachname, wunschposition, firmaId) VALUES (?, ?, ?, ?)',
      [vorname, nachname, wunschposition, firmaId]
    );
    res.status(201).send('Benutzerdaten hinzugefügt');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`dgv backend listening on ${port}`);
});

// Graceful shutdown
const shutdown = async () => { try { await pool.end(); } finally { process.exit(0); } };
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
