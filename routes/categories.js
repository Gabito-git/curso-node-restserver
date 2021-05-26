const { Router } = require('express');
const { check }  = require('express-validator');
const { 
    crearCategoria, 
    obtenerCategorias, 
    obtenerCategoria, 
    actualizarCategoria,
     borrarCategoria } = require('../controllers/categories');
const { existeCategoria } = require('../helpers/db-validators');
const { validarJWT, validarCampos } = require('../middlewares');
const { validaRole } = require('../middlewares');

const router =  Router();

/**
 * {{url}}/api/categories
 */

// Obtener todas las categorias - público
router.get('/', obtenerCategorias);

// Obtener una categoría por Id
router.get('/:id',[
    check('id', "No es un ID válido").isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos,
], obtenerCategoria)

router.use( validarJWT )

// Crear categoria  - privado  - cualquier persona con token válido
router.post('/',[ 
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);

// Actualizar categoria - privado - cualquiera con token valido
router.put('/:id',[
    check('id', "No es un ID válido").isMongoId(),
    check('id').custom( existeCategoria ),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], actualizarCategoria)


// Borrar categoria - Admin
router.delete('/:id',[
    validaRole.esAdminRole,
    check('id', "No es un ID válido").isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
], borrarCategoria)



module.exports = router;