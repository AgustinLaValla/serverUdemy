const { Router } = require('express');
const router = Router();
const { login, loginWithGoogle } = require('../controllers/login.controller');


//Routes
router.post('/', login);
router.post('/google', loginWithGoogle);

module.exports = router;