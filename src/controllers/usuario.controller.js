const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');

//GET USUARIO
const getUsuarios = async (req, res) => {
    let desde = req.query.desde || 0;
    desde = Number(desde);
    let paginate = req.query.paginate || 5;
    paginate = parseInt(paginate);

    try {
        const usuarios = await Usuario.find({ estado: true }, 'nombre email role estado google img')
            .skip(desde)
            .limit(paginate)
            .exec();
        if (!usuarios) {
            return res.status({
                ok: false,
                message: 'No users Found'
            });
        };

        const counter = await Usuario.countDocuments({ estado: true });
        return res.json({
            ok: true,
            usuarios,
            usuarios_totales: counter
        });

    } catch (error) {
        throw error;
    };

};

//CREATE USUARIO
const createUsuario = async (req, res) => {
    const { nombre, email, password, role } = req.body;

    if (!nombre || !email || !password || !role) {
        return res.status(400).json({
            message: 'All fields are required!'
        });
    };

    try {
        const usuario = new Usuario({
            nombre: nombre,
            email: email,
            password: bcrypt.hashSync(password, 10),
            role: role,
        });

        await usuario.save();
        res.json({
            ok: true,
            usuario
        });
    } catch (error) {
        throw error
    }
};

//UPDATE USUARIO
const updateUsuario = async (req, res) => {
    const { id } = req.params
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

    try {
        const usuario = await Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' });
        if (!usuario) {
            return res.status(400).json({ message: 'User not found' })
        };
        return res.json({
            ok: true,
            usuario: usuario
        });
    } catch (error) {
        console.log(error)
    };
};

//DELETE USUARIO
const deleteUsuario = async (req, res) => {
    const { id } = req.params;

    const cambiaEstado = { estado: false }
    const usuarioBorrado = await Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true });

    if (!usuarioBorrado) {
        return res.status(400).json({
            ok: false,
            message: `User does not exists`,
        });
    };

    usuarioBorrado.estado = false;
    return res.json({
        ok: true,
        message: `El usuario ha sido eliminado`,
        usuarioBorrado
    });
};

module.exports = { getUsuarios, createUsuario, updateUsuario, deleteUsuario };