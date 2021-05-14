const validarCampos = require('../middlewares/validarCampos');
const validarJWT = require('../middlewares/validarJWT');
const validaRole = require('../middlewares/validarRoles');

module.exports = {
    validarCampos,
    validarJWT,
    validaRole
}