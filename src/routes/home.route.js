const { Router } = require('express');
const { getIndex } = require('../controllers/home.controller');

const router = Router();

//index route
router.get('/', getIndex);

module.exports = router;