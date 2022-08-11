
const { Router } = require ('express');
const { check } = require('express-validator');

const { validateInputs } = require('../middlewares/validar-campos');
const { validRole, emailExist, existIdUser } = require('../helpers/db-validators');

//const Role = require('../models/role')

const { 
    userGet, 
    userPost, 
    userDelete, 
    userPath, 
    userPut } = require('../controllers/users');



const router = Router();

router.get('/', userGet);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe de ser mas de 6 letras').isLength({ min:6 }),
    //check('email', 'El correo no es valido').isEmail(),
    check('email').custom( emailExist ),
    check('rol').custom( validRole ),
    // check('rol').custom( async(rol= '') =>{
    //     const existRole = await Role.findOne({ rol });
    //     if ( !existRole ) {
    //         throw new Error(`El rol ${ rol } no esta registrado en la DB`)
    //     }
    // }),
    //check('rol', 'No es un Rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validateInputs
], userPost);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existIdUser ), 
    check('rol').custom( validRole ),
    validateInputs
], userPut);

router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existIdUser ), 
    validateInputs
], userDelete);

router.patch('/', userPath);


module.exports = router;