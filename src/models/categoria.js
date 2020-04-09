const { model, Schema } = require('mongoose');

const newCategoria = new Schema({
    descripcion: { type:String, required:[true, 'Categoty field is required!']},
    usuario: {type:Schema.Types.ObjectId, ref: 'Usuario'}
}, {timestamps:true});

module.exports = model('Categoria', newCategoria);