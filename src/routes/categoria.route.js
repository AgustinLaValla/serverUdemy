const { Router } = require('express');
const { verifyAdminRole, tokenVerification } = require('../middlewares/authentication');
const { getCategories, getCategory, createCategory, updateCategory, deleteCategory } = require('../controllers/categoria.controller')

const router = Router();

router.get('/',tokenVerification, getCategories); //Find Categories
router.get('/:id',tokenVerification, getCategory); //Find one categogy
router.post('/',tokenVerification, createCategory); //Create categories
router.put('/:id',tokenVerification, updateCategory); // Update category id: req.usuario._id
router.delete('/:id',[tokenVerification, verifyAdminRole], deleteCategory) // Delete category solo administrador

module.exports = router