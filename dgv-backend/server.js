const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL-Verbindung
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Zacepi1994!', // Passe das Passwort an deine MySQL-Konfiguration an
    database: 'dgv'
});

db.connect((err) => {
    if (err) {
        console.error('Fehler bei der Verbindung zur Datenbank:', err);
        return;
    }
    console.log('Mit der MySQL-Datenbank verbunden');
});

// Route, um alle Firmen abzurufen
app.get('/api/firmen', (req, res) => {
    const query = 'SELECT * FROM firmen';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Fehler beim Abrufen der Firmen:', err);
            res.status(500).send('Fehler beim Abrufen der Firmen');
        } else {
            res.json(results);
        }
    });
});

app.post('/api/speichern', (req, res) => {
    const { vorname, nachname, wunschposition, firmaId } = req.body;
    db.query(
        'INSERT INTO user_data (vorname, nachname, wunschposition, firmaId) VALUES (?, ?, ?, ?)',
        [vorname, nachname, wunschposition, firmaId],
        (err, results) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send('Daten gespeichert');
            }
        }
    );
});

// Server starten
const PORT = 5003;
app.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
