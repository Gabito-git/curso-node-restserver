const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');
require('dotenv').config();

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.authPath     = '/api/auth';
        this.usuariosPath = '/api/users';

        // Conectar a la base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    routes() {

        this.app.use(this.authPath, require('../routes/auth'));

        this.app.use(this.usuariosPath, require('../routes/user'));
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Parseo y lectura del body
        this.app.use(express.json());

        // Directorio público
        this.app.use(express.static('public'));
    }

    execute() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
        });
    }
}

module.exports = Server;
