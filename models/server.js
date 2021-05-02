const express = require('express');
const cors = require('cors');
require('dotenv').config();

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/users';

        // Middlewares
        this.middlewares();

        // Rutas
        this.routes();
    }

    routes() {
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
