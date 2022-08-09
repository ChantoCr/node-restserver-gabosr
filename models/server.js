const express = require('express');
const cors = require('cors')

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.userPath = '/api/users';

        //Middlewares
        this.middlewares();

        //Lectura y parseo del body
        this.app.use( express.json() );

        //Rutas de mi aplicacion
        this.routes();
    }

    middlewares() {
        // Directorio Publico
        this.app.use( express.static('public') )
        //CORS
        this.app.use( cors() );

    }


    routes () {
        this.app.use(this.userPath, require('../routes/user'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log(' Servidor Corriendo en el ', this.port);
        });
    }

}

module.exports = Server;