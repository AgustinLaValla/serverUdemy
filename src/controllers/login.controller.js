const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);


const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ ok: false, message: 'All fields are required!' });
    };
    try {
        const usuario = await Usuario.findOne({ email });
        if (!usuario) {
            return res.status(400).json({ ok: false, message: '(User) and password should be right' });
        };
        const isValid = await bcrypt.compare(password, usuario.password);

        if (!isValid) {
            return res.status(400).json({ ok: false, message: 'User and (password) should be right' });
        };

        const token = jwt.sign({
            usuario: usuario
        }, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });

        return res.json({ ok: true, message: 'Logged!', usuario, token });

    } catch (error) {

        return res.status(500).json({ message: error });
    };
};


//Google Configurations
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    return {
        nombre: payload.name,
        email: payload.email,
        img: payload.picture,
        google: true
    };
};


const loginWithGoogle = async (req, res) => {
    let token = req.body.idtoken;
    let googleUser = await verify(token).catch((err) => {
        return res.status(403).json({ ok: false, message: err })
    });


    try {
        const usuario = await Usuario.findOne({ email: googleUser.email });
        if (usuario) { //If user exists
        
            if(usuario.google === false) { 
                return res.status(400).json({
                    ok:false, message: 'You should sign in with your email'
                });
            } else { 
                const token = jwt.sign({usuario: usuario}, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });
                return res.json({ok:true, message:'Logged!', usuario, token}); 
            };
        } else {//If user does not exists
            let newUsuario = new Usuario({
                nombre: googleUser.nombre,
                email: googleUser.email,
                img: googleUser.img,
                google: true,
                password: ':)',
            });
            await newUsuario.save();
            const token = jwt.sign({usuario: newUsuario}, process.env.SEED, { expiresIn: process.env.CADUCIDAD_TOKEN });
            return res.json({ok:true, message:'User created!', newUsuario, token}); 
        };

    } catch (error) { 
        console.log(error)
        return res.status(500).json({
            ok: false,
            error
        });
    }

};


module.exports = { login, loginWithGoogle };