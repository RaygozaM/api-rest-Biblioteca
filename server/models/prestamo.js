const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Libro = require('./libro');
const Usuario = require('./usuario');
let date = new Date();

let Schema = mongoose.Schema;
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let prestamoSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Por favor ingresa tu ID']
    },
    libro: {
        type: Schema.Types.ObjectId,
        ref: 'Libro',
        unique: true,
        required: [true, 'Por favor ingresa el ID del libro ']
    },
    fechaSalida: {
        type: Date,
        default: (`${day}-${month}-${year}`)
    },
    estado: {
        type: Boolean,
        default: true
    }
});

prestamoSchema.plugin(uniqueValidator,{
    message: '(PATH) Debe ser unico y diferente'
});

module.exports = mongoose.model('Prestamo', prestamoSchema);