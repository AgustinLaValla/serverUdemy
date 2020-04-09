const express = require('express');
const app = express();
const homeRoutes = require('./home');
const usuarioRoutes = require('./usuario');
const loginRoutes = require('./login');
const categoriasRoutes = require('./categoria');
const productosRoutes = require('./producto');


//Routes
app.use(homeRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/categoria', categoriasRoutes);
app.use('/productos', productosRoutes);

module.exports = app;