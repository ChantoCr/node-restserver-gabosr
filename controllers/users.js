const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Users = require('../models/user')

const userGet = async (req = request, res = response) => {

    //Get a mano
    //const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

    //Get de todos los usuarios de la DB
    //const users = await  Users.find();

    const { limit = 5, starting = 0 } = req.query
    //Tambien podriamos mandar el dato de status asi: { status:true } en vez del query
    const query = { status:true } 


//-------------------------------Opcional pero mas lento que la resp con el Promise--------------------------------------------
    // const users = await  Users.find(query)
        //Agarrar usuarios con limite o apartir de que posicion
        // .skip(Number(starting))
        // .limit(Number(limit));
//-------------------------------Opcional pero mas lento que la resp con el Promise--------------------------------------------
    // const total = await Users.countDocuments(query);


    const [total, users] = await Promise.all([
        Users.countDocuments(query),
        Users.find(query)
            .skip(Number(starting))
            .limit(Number(limit))
    ]);

    res.json({
        total,
        users
        //total,
        //users
    });
    // res.json({
    //     msg: 'get Api - controlador',
    //     q,
    //     nombre,
    //     apikey, 
    //     page,
    //     limit
    // });
}

const userPost = async (req, res = response) => {

    const { name, email, password, rol } = req.body;
    const user = new Users( {name, email, password, rol} );

    //Verificar si el correo existe
    // const existEmail = await Users.findOne({ email });
    // if ( existEmail ){
    //     return res.status(400).json({
    //         msg: 'El correo ya esta registrado'
    //     });
    // }

    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    //Guardar DB
    await user.save();
    

    res.json({
        msg: 'post Api - controlador',
        user
    });
}

const userPut = async(req, res= response) => {

    const { id } = req.params;
    const { _id, password, google, email, ...restData } = req.body;

    // TODO validar contra base de datos
    if ( password ) {
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync();
        restData.password = bcryptjs.hashSync( password, salt );
    }

    const userDB = await Users.findByIdAndUpdate( id, restData);

    res.json(userDB);
}

const userDelete = async(req, res) => {

    const { id } = req.params;

    //Borrar fisicamente de la db
    //const user = await Users.findByIdAndDelete( id );

    //Borrar de "forma correxta", desacticar cuenta
    const user = await Users.findByIdAndUpdate(id, {status: false});

    res.json( user );
}


const userPath = (req, res) => {
    res.json({
        msg: 'patch Api - controlador'
    });
}

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete,
    userPath
}
