const validarCampos = require('../middlewares/validarCampos');
const validarJWT = require('../middlewares/validarJWT');
const validaRole = require('../middlewares/validarRoles');
const validarArchivo = require('../middlewares/validarArchivo');

module.exports = {
    validarCampos,
    validarJWT,
    validaRole,
    validarArchivo
}