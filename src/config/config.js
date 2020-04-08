//Puerto
//Proccess es un objeto global que corre a lo largo de la aplicación de Node
process.env.PORT = process.env.PORT || 3000;

//Entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//Base de datos
let URLDB;

if (process.env.NODE_ENV === 'dev') {
    URLDB = 'mongodb://localhost:27017/cafe';
} else {
    URLDB = 'mongodb+srv://strider:newkeyword10@api-books-81xrk.mongodb.net/cafe';
};

//Databse url
process.env.urlDB = URLDB;

//Vencimiento del token
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

//SEED de autenticación
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

//GOOGLE CLIENT
process.env.CLIENT_ID = process.env.CLIENT_ID || '337218875190-1fch0gemblkajnmbmtfg89u764mjrleh.apps.googleusercontent.com'

