const express = require('express');
const app = express();
const homeRoutes = require('./home.route');
const usuarioRoutes = require('./usuario.route');
const loginRoutes = require('./login.route');
const categoriasRoutes = require('./categoria.route');
const productosRoutes = require('./producto.route');
const uploadsRoutes = require('./upload.route');
const imagenesRoutes = require('./imagenes.route');

//Routes
app.use(homeRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/categoria', categoriasRoutes);
app.use('/productos', productosRoutes);
app.use('/upload', uploadsRoutes);
app.use('/imagenes', imagenesRoutes);

module.exports = app;