const express = require('express');
const app = express();
const _ = require('underscore');
const Categoria = require('../models/categoria');

app.post('/categoria', (req, res)=>{
    let body = req.body;
    
    let categoria = new Categoria({
        nombre: body.nombre
    });

    categoria.save((err, catDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            catDB
        });
    });
});

app.get('/categoria', (req, res) => {
    Categoria.find()
        .exec((err, categorias) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            return res.status(200).json({
                ok: true,
                count: categorias.length,
                categorias
            })
        });
});


app.put('/categoria/:id', (req, res) =>{
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'estado']);
    
    Categoria.findByIdAndUpdate(id, body, {new: true, runValidators: true, context:'query'}, (err, catDB) =>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }else{
            return res.status(200).json({
                ok: true,
                catDB
            });
        }
    });
});

app.delete('/categoria/:id', (req, res) => {
    let id = req.params.id;
    Categoria.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
        if (err) {
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