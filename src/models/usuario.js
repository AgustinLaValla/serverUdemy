const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol válido'
};

let usuarioSchema = new Schema({ 
    nombre: {
        type:String,
        require:[true, 'El nombre es necesario'],
    },
    email: { 
        type:String,
        unique:true,
        required:[true, 'El correo es necesario']
    },
    password: { 
        type:String,
        required:[true, 'La contraseña es obligatoria']
    },
    img: {
        type:String,
        required:false
    },
    role: {
        type:String,
        default:'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type:Boolean,
        default:true
    },
    google: {
        type:Boolean,
        default:false
    }

});

//Hide the password to final user
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObjet = user.toObject();
    delete userObjet.password;
    return userObjet;
};
usuarioSchema.plugin(uniqueValidator, {message: '{PATH} debe de ser único'});
module.exports = mongoose.model('Usuario', usuarioSchema);