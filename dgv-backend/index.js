const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MySQL-Datenbankverbindung
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

db.connect(err => {
    if (err) {
        console.error('Datenbankverbindung fehlgeschlagen:', err.message);
    } else {
        console.log('Verbunden mit MySQL-Datenbank');
    }
});

// API-Routen
app.get('/api/firmen', (req, res) => {
    db.query('SELECT * FROM firmen', (err, results) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.json(results);
        }
    });
});

app.post('/api/firmen', (req, res) => {
    const { name, adresse } = req.body;
    const sql = 'INSERT INTO firmen (name, adresse) VALUES (?, ?)';
    db.query(sql, [name, adresse], (err, results) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(201).send('Firma hinzugefügt');
        }
    });
});

app.post('/api/daten', (req, res) => {
    const { vorname, nachname, wunschposition, firmaId } = req.body;
    const sql = 'INSERT INTO benutzerdaten (vorname, nachname, wunschposition, firmaId) VALUES (?, ?, ?, ?)';
    db.query(sql, [vorname, nachname, wunschposition, firmaId], (err, results) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(201).send('Benutzerdaten hinzugefügt');
        }
    });
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
