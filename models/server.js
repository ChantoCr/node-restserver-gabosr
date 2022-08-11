const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../db/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/users';

        //Conectar DB
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Lectura y parseo del body
        this.app.use( express.json() );

        //Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        // Directorio Publico
        this.app.use( express.static('public') )
        //CORS
        this.app.use( cors() );

    }

    routes () {
        this.app.use(this.userPath, require('../routes/users'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(' Servidor Corriendo en el ', this.port);
        });
    }

}

module.exports = Server;