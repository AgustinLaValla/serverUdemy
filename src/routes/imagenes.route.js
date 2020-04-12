const { Router } = require('express');
const { getImage } = require('../controllers/imagenes.controller');
const { imgTokenVerification } = require('../middlewares/authentication');

const router = Router();

router.get('/:tipo/:img', imgTokenVerification ,getImage);


module.exports = router;