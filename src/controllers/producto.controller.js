const Producto = require('../models/producto');


const getProductos = async (req, res) => {
    const  desde  = Number(req.query.desde) || 0;
    const  paginate  = Number(req.query.paginate) || 5;
    try {
        const productos = await Producto.find({disponible: true})
            .skip(desde)
            .limit(paginate)
            .populate('usuario', 'nombre email')
            .populate('categoria', 'descripcion')
            .exec();
        return res.json({ ok: true, productos })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ ok: false, message: error });
    }
};

const getProducto = async (req, res) => {
    const { id } = req.params;
    const producto = await Producto.findById(id).populate('usuario', 'nombre email').populate('categoria').exec();
    if (!producto) {
        return res.status(401).json({ ok: false, message: 'Not Found' });
    };
    return res.json({ ok: true, producto });
};

const createProductos = async (req, res) => {
    const { nombre, precioUni, descripcion, categoria } = req.body;
    const userId = req.usuario._id;
    if (!nombre || !precioUni || !descripcion) {
        return res.status(400).json({ ok: false, message: 'Invalid data' });
    };
    const producto = new Producto({ nombre, precioUni, descripcion, categoria ,usuario: userId });
    try {
        await producto.save();
        return res.json({ ok: true, producto });
    } catch (error) {
        console.log(error);
        return res.json({ ok: false, message: error });
    };
};

const updateProductos = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    if (!body) return;
    const producto = await Producto.findById(id);
    if(!producto) { 
        return res.status(401).json({ok: false, message: 'Product does not exists!'});
    };
    const userId = req.usuario._id;
    const newData = { ...body, usuario: userId };
    try {
        const updatedProducto = await Producto.findByIdAndUpdate(id, newData, { new: true, runValidators: true });
        return res.json({ ok: true, updatedProducto });
    } catch (error) {
        console.log(error);
        res.status(400).json({ ok: false, message: error });
    };
};

const deleteProductos = async (req, res) => {
    const { id } = req.params;
    const producto = await Producto.findById(id);
    if (!producto) {
        return res.status(400).json({ ok: false, message: 'Not Found!' });
    };
    const deleteProduct = { disponible: false };
    await Producto.findByIdAndUpdate(id, deleteProduct);
    return res.json({ ok: true, message: 'Product successfully deleted!' });
};


const searchProducts = async (req, res) => {
    const { termino } = req.params;
    let regex = new RegExp(termino, 'i'); //Regular Expresion
    const productos = await Producto.find({nombre: regex}).populate('categoria', 'nombre').exec();
    if(!productos) return res.status(400).json({ok:false, message: 'Product not found'});
    return res.json({ok:true, productos});
};

module.exports = { getProductos, getProducto, createProductos, updateProductos, deleteProductos, searchProducts };