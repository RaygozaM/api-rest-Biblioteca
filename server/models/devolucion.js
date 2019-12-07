const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Libro = require('./libro');
const Usuario = require('./usuario');
const Prestamo = require('./prestamo');


let Schema = mongoose.Schema;
let devolucionSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true, 'Por favor ingresa tu ID']
    },
    libro: {
        type: Schema.Types.ObjectId,
        ref: 'Libro',
        required: [true, 'Por favor ingresa el ID del libro']
    },
    idPrestamo: {
        type: Schema.Types.ObjectId,
        ref: 'Prestamo',
        required: [true, 'Por favor ingresa el ID del prestamo']
    },
    fechaDevolucion: {
        type: Date,
        default: Date.now()
    },
    estado: {
        type: Boolean,
        default: true
    }
});

devolucionSchema.plugin(uniqueValidator,{
    message: '(PATH) Debe ser unico y diferente'
});

module.exports = mongoose.model('Devolucion', devolucionSchema);