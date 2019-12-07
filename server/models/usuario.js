const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Por favor ingresa el nombre del usuario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Por favor ingresa el email']
    },
    password:{
        type: String,
        required: [true, 'Por favor ingresa una contraseña']
    },
    role:{
        type: String,
        default: 'USER_ROLE'
    },
    img:{
        type: String,
        //required: [true, 'Por favor inserta una imagen']
    },
    estado: {
        type: Boolean,
        default: true
    },
});

usuarioSchema.plugin(uniqueValidator,{
    message: '(PATH) Debe ser unico y diferente'
});

module.exports = mongoose.model('Usuario', usuarioSchema);