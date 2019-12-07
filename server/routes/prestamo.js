const express = require('express');
const app = express();
const _ = require('underscore');
const {verificaToken} = require('../middlewares/autenticacion')

const Prestamo = require('../models/prestamo');
const Libro = require('../models/libro');

app.get('/prestamo/noRentados/:desde/:limite', /*[verificaToken],*/ (req, res) =>{
    let desde = req.params.desde || 0;
    let limite = req.params.limite || 5;
    desde = Number(desde);
    limite = Number(limite);
    Libro.find({ estado: true })
    .skip(desde)
    .limit(limite)
    .exec((err, prestamo) =>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }else{
            return res.status(200).json({
                ok: true,
                count: prestamo.length,
                prestamo
            });
        }
    });
});

app.get('/prestamo/rentados/:desde/:limite', /*[verificaToken],*/ (req, res) =>{
    let desde = req.params.desde || 0;
    let limite = req.params.limite || 5;
    desde = Number(desde);
    limite = Number(limite);
    Libro.find({ estado: false })
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

app.post('/prestamo', /*[verificaToken],*/ (req, res) =>{
    let body = req.body;
    let id = req.body.libro;
    let prestamo = new Prestamo({
        usuario: body.usuario,
        libro: body.libro,
        //,
       // fecha: body.fecha
    });
    prestamo.save((prestamoDB) => {
        Libro.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
            if(err){
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                prestamoDB,
                resp
            });
        });
    });
});


app.put('/prestamo/:id', (req, res) =>{
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'estado', 'categoria', 'img', 'ubicacion', 'precio']);
    
    Prestamo.findByIdAndUpdate(id, body, {new: true, runValidators: true, context:'query'}, (err, prestamoDB) =>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }else{
            return res.status(200).json({
                ok: true,
                prestamoDB
            });
        }
    });
});

app.delete('/prestamo/:id', (req, res) =>{
    let id = req.params.id;

    Prestamo.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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