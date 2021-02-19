const express = require('express');
const db = require('./config/database');
const rateLimit = require("express-rate-limit");
const bodyParse = require('body-parser');
const helmet = require('helmet');
// const articleRoutes = require('./routes/article');
const userRoutes = require('./routes/user');

try {
    db.authenticate();
    console.log('Connecté à la base de données MySQL!');

} catch (error) {
    console.error('Impossible de se connecter, erreur suivante :', error);
}

const app = express();

// Limite les demandes répétées à  l'API 
// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100 // limit each IP to 100 requests per windowMs
// });

// app.use(limiter);

// Analyser les corps de requête entrants dans un middleware
app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Sécurise en définissant divers en-têtes HTTP
app.use(helmet());

// app.use('/api/article', articleRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;