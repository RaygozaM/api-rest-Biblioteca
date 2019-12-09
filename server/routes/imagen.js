const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const {verificaToken} = require('../middlewares/autenticacion')

app.get('/imagen/:ruta/:img', [verificaToken], (req, res) =>{
    let ruta = req.params.ruta;
    let img = req.params.img;
    let rutaImagen = path.resolve(__dirname, `../../uploads/${ruta}/${img}`);
    let noImage = path.resolve(__dirname, `../../assets/noImagen.png`);

    if(fs.existsSync(rutaImagen)){
        return res.sendfile(rutaImagen);
    }else{
        return res.sendfile(noImage);
    }
});
 
module.exports = app;