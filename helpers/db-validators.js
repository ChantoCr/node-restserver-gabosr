
const Role = require('../models/role');
const User = require('../models/user');

const validRole = async(rol= '') => {
    const existRole = await Role.findOne({ rol });
    if ( !existRole ) {
        throw new Error(`El rol ${ rol } no esta registrado en la DB`)
    }
}

const emailExist = async(email= '') => {
    //Verificar si el correo existe
    const existEmail = await User.findOne({ email });
    if ( existEmail ){
        throw new Error(`El email: ${ email } ya esta registrado en la DB`)
    }
}

const existIdUser = async( id ) => {
    //Verificar si el ID existe
    const existUser = await User.findById( id );
    if ( !existUser ){
        throw new Error(`El siguiente id: ${ id } no existe`)
    }
}


module.exports = {
    validRole, 
    emailExist,
    existIdUser
}