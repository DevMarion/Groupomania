const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require("dotenv").config();

const routesUser = require('./Routes/user');
const routePost = require("./Routes/post");

const path = require("path");

mongoose.connect(process.env.CONNECTION_MDB,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

const corsOptions = {
    origin: '*',
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}
app.use(cors());

app.use(express.json());

app.use('/photos', express.static(path.join(__dirname, 'photos')));
app.use('/profils', express.static(path.join(__dirname, 'profils')));


app.use('/api/user', routesUser);
app.use('/api/post', routePost);

module.exports = app;