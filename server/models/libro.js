const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const Categoria = require('./categoria');

let Schema = mongoose.Schema;

let libroSchema = new Schema({
    nombre: {
        type: String,
        unique: true,
        required: [true, 'Por favor ingresa el nombre del libro']
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: [true, 'Por favor ingresa la categoria']
    },
    ubicacion: {
        type: String,
        required: [true, 'Por favor ingresa el pasillo en el que se encuentra']
    },
    precio: {
        type: Number,
        required: [true, 'Por favor ingresa el precio']
    },
    estado: {
        type: Boolean,
        default: true
    },
    disponible:{
        type: Boolean,
        default: true
    },
    img:{
        type: String,
        //required: [true, 'Por favor inserta una imagen']
    }
});

libroSchema.plugin(uniqueValidator,{
    message: '(PATH) Debe ser unico y diferente'
});

module.exports = mongoose.model('Libro', libroSchema);