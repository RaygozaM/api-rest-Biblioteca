require('./config/config');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Habilita CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
    );
    next();
});

//parse aplication/ x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));

//parse formato to aplication/json
app.use(bodyParser.json());

// agroup archive of routes
app.use(require('./server/routes/index'));

//connection to database
mongoose.connect(process.env.URLDB, 
{ useNewUrlParser: true, 
useUnifiedTopology: true, 
useCreateIndex: true,
useFindAndModify: false }, 

(err, resp)=>{
    if(err) throw err;

    console.log('Base de datos Online');
});

//port 
app.listen(process.env.PORT, ()=>{
    console.log("escuchando por el puerto: ", process.env.PORT);
});