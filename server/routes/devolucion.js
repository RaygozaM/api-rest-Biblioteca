const express = require('express');
const app = express();
const _ = require('underscore');
const {verificaToken} = require('../middlewares/autenticacion')

const Devolucion = require('../models/devolucion');
const Libro = require('../models/libro');
const Prestamo = require('../models/prestamo');

app.post('/devolucion', [verificaToken], (req, res) =>{
    let body = req.body;
    let id = req.body.libro;
    let idPrestamo = req.body.idPrestamo;
    let devolucion = new Devolucion({
        usuario: body.usuario,
        libro: body.libro,
        idPrestamo: body.idPrestamo
    });
    devolucion.save((prestamoDB) => {
        Prestamo.deleteOne({_id: idPrestamo }, (err, respPrestamo) =>{
            Libro.findByIdAndUpdate(id, { estado: true }, { new: true, runValidators: true, context: 'query' }, (respLibro) => {
                if(err){
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }
                return res.status(200).json({
                    ok: true,
                    prestamoDB,
                    respPrestamo,
                    respLibro
                });
            });
        }); 
    });
});

app.get('/devolucion', [verificaToken], (req, res) =>{
    Devolucion.find({ estado: true })
    .exec((err, devolucions) =>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }else{
            return res.status(200).json({
                ok: true,
                count: devolucions.length,
                devolucions
            });
        }
    });
});

module.exports = app;