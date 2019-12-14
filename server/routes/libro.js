const express = require('express');
const app = express();
const _ = require('underscore');
const {verificaToken} = require('../middlewares/autenticacion')

const Libro = require('../models/libro');

app.get('/libro', [verificaToken], (req, res) =>{
    Libro.find()
    .exec((err, libros) =>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }else{
            return res.status(200).json({
                ok: true,
                count: libros.length,
                libros
            });
        }
    });
});

app.get('/libro/disponible', [verificaToken], (req, res) =>{
    Libro.find({estado: true})
    .exec((err, libros) =>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }else{
            return res.status(200).json({
                ok: true,
                count: libros.length,
                libros
            });
        }
    });
});

app.get('/libro/noDisponible', [verificaToken], (req, res) =>{
    Libro.find({estado: false})
    .exec((err, libros) =>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }else{
            return res.status(200).json({
                ok: true,
                count: libros.length,
                libros
            });
        }
    });
});

app.get('/libro/eliminado', [verificaToken], (req, res) =>{
    Libro.find({disponible: true})
    .exec((err, libros) =>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }else{
            return res.status(200).json({
                ok: true,
                count: libros.length,
                libros
            });
        }
    });
});


app.post('/libro', [verificaToken], (req, res) =>{
    let body = req.body;

    let libro = new Libro({
        nombre: body.nombre,
        categoria: body.categoria,
        ubicacion: body.ubicacion,
        precio: body.precio,
        img: body.img
    });

    libro.save((err, libroDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            libroDB
        });
    });
});

app.put('/libro/:id', [verificaToken], (req, res) =>{
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'disponible', 'categoria', 'img', 'ubicacion', 'precio']);
    
    Libro.findByIdAndUpdate(id, body, {new: true, runValidators: true, context:'query'}, (err, libroDB) =>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }else{
            return res.status(200).json({
                ok: true,
                libroDB
            });
        }
    });
});

app.delete('/libro/:id', [verificaToken],(req, res) =>{
    let id = req.params.id;

    Libro.findByIdAndUpdate(id, { disponible: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }

        return res.status(200).json({
            ok: true,
            resp
        });
    });
});

module.exports = app;