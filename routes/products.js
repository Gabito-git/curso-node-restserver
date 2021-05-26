const { Router } = require('express');
const { check } = require('express-validator');
const { 
    crearProducto, 
    obtenerProductos, 
    obtenerProducto, 
    actualizarProducto, 
    borrarProducto} = require('../controllers/products');
const { existeCategoria, existeProducto } = require('../helpers/db-validators');
const { validarJWT, validarCampos, validaRole } = require('../middlewares');

const router = Router();

/**
 * {{url}}/api/products
 */

router.get('/', obtenerProductos);

router.get('/:id',[
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
], obtenerProducto);

router.use( validarJWT );

router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'La categoria es obligatoria').not().isEmpty(),
    check('categoria', 'El id no es válido').isMongoId(),
    check('categoria').custom( existeCategoria ),
    validarCampos
] ,crearProducto);

router.put('/:id',[
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom( existeProducto ),
], actualizarProducto);

router.delete('/:id', [
    validaRole.esAdminRole,
    check('id', 'El id no es válido').isMongoId(),
    check('id').custom( existeProducto )
],borrarProducto)

module.exports = router;