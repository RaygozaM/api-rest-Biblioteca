const express = require('express');
const app = express();
const _ = require('underscore');
const {verificaToken} = require('../middlewares/autenticacion')

const Prestamo = require('../models/prestamo');
const Libro = require('../models/libro');

app.get('/prestamo/noRentados', [verificaToken], (req, res) =>{
    Libro.find({ estado: true })
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

app.get('/prestamo', [verificaToken], (req, res) =>{
    Prestamo.find({ estado: true })
    .exec((err, prestamos) =>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }else{
            return res.status(200).json({
                ok: true,
                count: prestamos.length,
                prestamos
            });
        }
    });
});

app.get('/prestamo/rentados', [verificaToken], (req, res) =>{
    Libro.find({ estado: false })
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


app.put('/prestamo/:id', [verificaToken], (req, res) =>{
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

app.delete('/prestamo/:id', [verificaToken], (req, res) =>{
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