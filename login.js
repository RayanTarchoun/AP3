require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./userRoutes');
const mysql = require('mysql2');

// Connexion à MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'user_management'
});

db.connect((err) => {
    if (err) {
        console.error("Erreur de connexion à la base de données :", err);
        process.exit(1);
    }
    console.log("Connecté à la base de données MySQL.");
});

// Ajout de la base de données à req
const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => {
    req.db = db;
    next();
});

// Routes
app.use('/api/users', userRoutes);

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
