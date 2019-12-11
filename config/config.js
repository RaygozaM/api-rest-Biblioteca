//PUERTO
process.env.PORT = process.env.PORT || 3000;

//Entorno (ENV)
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'; 

//Connection to database
let urlDB;

if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://localhost:27017/Biblioteca';
} else{
    urlDB = 'mongodb+srv://ADMIN:.x25,zax.@cluster0-luz0b.mongodb.net/Bliblioteca'
}

process.env.URLDB = urlDB;

//JWT SIGN
process.env.SEED = process.env.SEED || 'Firma-super-secreta';

///EMPIRE TIME JWT
process.env.CADUCIDAD_TOKEN =  process.env.CADUCIDAD_TOKEN || '3h';