const { response } = require('express');

const userGet = (req, res = response) => {

    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

    res.json({
        msg: 'get Api - controlador',
        q,
        nombre,
        apikey, 
        page,
        limit
    });
}

const userPost = (req, res) => {

    const {nombre, edad} = req.body;

    res.json({
        msg: 'post Api - controlador',
        nombre, 
        edad
    });
}

const userPut = (req, res) => {

    const { id } = req.params;

    res.json({
        msg: 'put Api - controlador',
        id
    });
}

const userDelete =(req, res) => {
    res.json({
        msg: 'delete Api - controlador'
    });
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
