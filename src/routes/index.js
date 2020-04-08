const express = require('express');
const app = express();
const homeRoutes = require('./home');
const usuarioRoutes = require('./usuario');
const loginRoutes = require('./login');



//Routes
app.use(homeRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);

module.exports = app;