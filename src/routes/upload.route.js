const Router = require('express');
const fileUpload = require('express-fileupload');
const router = Router();
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
const fs = require('fs');
const path = require('path');

//Express-fileupload Middleware
router.use(fileUpload({ useTempFiles: true }));

//Routes
router.put('/:tipo/:id', (req, res) => {

    let { tipo, id } = req.params;

    if (!req.files) {
        return res.status(400).json({ ok: false, message: 'There is no file selected' });
    };

    let validTypes = ['productos', 'usuarios'];
    if (validTypes.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            message: 'Los tipos validos son: ' + validTypes.join(', ')
        });
    };

    let archivo = req.files.archivo;

    //Extensiones permitidas
    let validExtensions = ['png', 'jpg', 'gif', 'jpeg'];

    const nombreArchivo = archivo.name.split('.');
    const extension = nombreArchivo[nombreArchivo.length - 1];

    if (validExtensions.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            message: 'Las extensiones permitidas son: ' + validExtensions.join(', '),
            extension
        });
    };

    //Change file name
    let filename = `${id}-${new Date().getMilliseconds()}.${extension}`

    archivo.mv(`src/uploads/${tipo}/${filename}`, (err) => {
        if (err) return res.status(500).json({ ok: false, message: err });
        if (tipo === 'usuarios') {
            imagenUsuario(id, res, filename);
        } else {
            imagenProducto(id, res, filename)
        };
    });
});

async function imagenUsuario(id, res, filename) {

    try {
        usuario = await Usuario.findById(id);
        if (!usuario) {
            borraArchivo(usuario.img, filename);
            return res.status(400).json({ ok: false, message: 'User not found' });
        }

        borraArchivo(usuario.img, 'usuarios');

        usuario.img = filename;
        await usuario.save();
        return res.json({ ok: true, usuario, img: filename });
    } catch (err) {
        borraArchivo(usuario.img, filename);
        console.log(err);
        return res.status(500).json({ ok: false, message: err });
    };

}

async function imagenProducto(id, res, filename) {
    try {
        const producto = await Producto.findById(id);
        if (!producto) {
            borraArchivo(producto.img, filename)
            return res.status(400).json({ ok: false, message: 'Product not found' });
        };

        borraArchivo(producto.img, 'productos');

        producto.img = filename;
        await producto.save();
        return res.json({ ok: true, producto, img: filename });
    } catch (error) {
        borraArchivo(filename, 'productos');
        return res.status(500).json({ ok: false, message: err });
    };
};

function borraArchivo(imageName, tipo) {
    let pathImage = path.resolve(`${__dirname}/../uploads/${tipo}/${imageName}`);
    console.log(pathImage);

    if (fs.existsSync(pathImage)) {
        fs.unlinkSync(pathImage);
    };
};

module.exports = router;