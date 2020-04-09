const { Router } = require('express');
const { getProductos, getProducto, createProductos, updateProductos, deleteProductos, searchProducts } = require('../controllers/producto.controller')
const { tokenVerification } = require('../middlewares/authentication');

const router = Router();

router.get('/', tokenVerification, getProductos);
router.get('/:id', tokenVerification, getProducto);
router.post('/', tokenVerification, createProductos);
router.get('/buscar/:termino', tokenVerification, searchProducts) // Find products
router.put('/:id', tokenVerification, updateProductos);
router.delete('/:id', tokenVerification, deleteProductos);

module.exports = router;