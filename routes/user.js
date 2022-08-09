
const { Router } = require ('express');
const { 
    userGet, 
    userPost, 
    userDelete, 
    userPath, 
    userPut } = require('../controllers/user');

const router = Router();

router.get('/', userGet);

router.post('/', userPost);

router.put('/:id', userPut);

router.delete('/', userDelete);

router.patch('/', userPath);


module.exports = router;