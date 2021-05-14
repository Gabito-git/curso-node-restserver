const { Router } = require('express');
const { check } = require('express-validator');
const {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
} = require('../controllers/user');
const { roleValidator, emailExists, userByID } = require('../helpers/db-validators');

const { validarCampos, validarJWT, validaRole} = require('../middlewares');

// const esAdminRole = require('../middlewares/validarRoles');
const router = Router();

router.get('/', usersGet);

router.put('/:id', [
    check('id', "No es un ID válido").isMongoId(),
    check('id').custom( userByID ),
    check('role').custom( roleValidator ),
    validarCampos
],usersPut);

router.post('/', [
    check( 'nombre', 'El nombre es obligatorio' ).not().isEmpty(),
    check( 'password', 'El password debe tener más de 6 caracteres' ).isLength({min: 6}),
    check( 'email', 'El correo no es válido' ).isEmail(),
    // check( 'role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('email').custom( emailExists ),
    check('role').custom( roleValidator ),
    validarCampos
],usersPost);

router.delete('/:id',[
    validarJWT,
    // esAdminRole,
    validaRole.tieneRole('ADMIN_ROLE', 'SELLS_ROLE'),
    check('id', "No es un ID válido").isMongoId(),
    check('id').custom( userByID ),
    validarCampos
], usersDelete);

module.exports = router;
