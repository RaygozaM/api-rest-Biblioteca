const express = require('express');
const app = express();
const _ = require('underscore');
const {verificaToken} = require('../middlewares/autenticacion')

const Libro = require('../models/libro');

app.get('/libro/:desde/:limite', /*[verificaToken],*/ (req, res) =>{
    let desde = req.params.desde || 0;
    let limite = req.params.limite || 5;
    desde = Number(desde);
    limite = Number(limite);
    Libro.find({ estado: true })
    .skip(desde)
    .limit(limite)
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

app.post('/libro', /*[verificaToken],*/ (req, res) =>{
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

app.put('/libro/:id', (req, res) =>{
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'estado', 'categoria', 'img', 'ubicacion', 'precio']);
    
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

app.delete('/libro/:id', (req, res) =>{
    let id = req.params.id;

    Libro.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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