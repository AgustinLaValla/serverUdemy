require('./config/config');
const express = require('express');
const indexRoute = require('./routes/index');
const path = require('path');

//Server
const app = express();

//Settings
app.use(express.static(path.join(__dirname, 'views' ))); //Set public folder
// app.use(fileupload({useTempFiles: true}))

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//Routes: Global Routes configuration
app.use(indexRoute);

module.exports = { app };