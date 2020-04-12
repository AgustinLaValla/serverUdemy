const { Router } = require('express');
const { getUsuarios, createUsuario, updateUsuario, deleteUsuario } = require('../controllers/usuario.controller');
const router = Router();
const { tokenVerification, verifyAdminRole } = require('../middlewares/authentication');

router.get('/', tokenVerification, getUsuarios);

router.post('/', [tokenVerification, verifyAdminRole], createUsuario); //Protected routes

router.put('/:id', [tokenVerification, verifyAdminRole], updateUsuario); //Protected routes

router.delete('/:id', [tokenVerification, verifyAdminRole], deleteUsuario); //Protected routes


module.exports = router;