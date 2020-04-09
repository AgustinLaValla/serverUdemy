const Categoria = require('../models/categoria');


//GET CATEOGIES
const getCategories = async (req, res) => {

    try {
        const categoria = await Categoria.find().sort('createdAt').populate('usuario', 'nombre email').exec();
        return res.json({ ok: true, categoria });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ ok: false, message: error });
    };
};

// GET SINGLE CATEGORY
const getCategory = async (req, res) => {
    const { id } = req.params;
    const category = await Categoria.findById(id);
    if (!category) {
        return res.status(401).json({ ok: false, message: 'Not Found' });
    };
    return res.json({ ok: true, categoria: category });
};

//CREATE CATEGORY
const createCategory = async (req, res) => {

    const userId = req.usuario._id;
    const  descripcion  = req.body.descripcion;
    console.log(req.body)
    if (!descripcion || !userId) {
        return res.status(400).json({ ok: false, message: 'Body is required!' });
    } else {
        const newCategoria = new Categoria({ usuario: userId, descripcion: descripcion });

        try {
            await newCategoria.save();
            return res.json({ ok: true, categoria: newCategoria });
        } catch (error) {
            console.log(err);
            return res.status(500).json({ ok: false, message: err })
        }

    };
};

//UPDATE CATEGORY
const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    const category = await Categoria.findByIdAndUpdate(id, body, { new: true, runValidators:true });
    if (!category) {
        return res.status(401).json({ ok: false, message: 'Not Found' });
    };

    return res.json({ ok: true, categoria: category });

};

//DELETE CATEGORY
const deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        await Categoria.findByIdAndDelete(id);
        return res.json({ok:true, message:'Category successfully deleted!'});
    } catch (error) {
        console.log(error);
        return res.status(400).json({ ok: false, message: error });
    };

};

module.exports = { getCategories, getCategory, createCategory, updateCategory, deleteCategory };