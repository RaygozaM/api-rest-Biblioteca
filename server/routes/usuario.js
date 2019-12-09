const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');
const {verificaToken} = require('../middlewares/autenticacion')

const Usuario = require('../models/usuario');

app.get('/usuario/:desde/:limite', [verificaToken], (req, res) =>{
    let desde = req.params.desde || 0;
    let limite = req.params.limite || 5;
    desde = Number(desde);
    limite = Number(limite);
    Usuario.find({ estado: true })
    .skip(desde)
    .limit(limite)
    .exec((err, usuarios) =>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }else{
            return res.status(200).json({
                ok: true,
                count: usuarios.length,
                usuarios
            });
        }
    });
});

app.post('/usuario', [verificaToken], (req, res) =>{
    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img
    });

    usuario.save((err, usrDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        return res.status(200).json({
            ok: true,
            usrDB
        });
    });
});

app.put('/usuario/:id', [verificaToken], (req, res) =>{
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'estado', 'role', 'img']);
    
    Usuario.findByIdAndUpdate(id, body, {new: true, runValidators: true, context:'query'}, (err, usrDB) =>{
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }else{
            return res.status(200).json({
                ok: true,
                usrDB
            });
        }
    });
});

app.delete('/usuario/:id', [verificaToken], (req, res) =>{
    let id = req.params.id;

    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, resp) => {
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