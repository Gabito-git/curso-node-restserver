const  bcryptjs  = require('bcryptjs');
const generarJWT = require('../helpers/generarJWT');
const Usuario = require("../models/usuario");



const login = async(req, res) => {

    const { email, password } = req.body;

    try {

        const user =  await Usuario.findOne( { email } );

        // Verificar si el usuario existe
        if(!user){
            return res.status(400).json({
                msg: 'Usuario / contraseña no son correctos  -  correo'
            })
        }


        // Verificar si se encuentra activo. Estado en true
        if( !user.estado ){
            return res.status(400).json({
                msg: 'Usuario / contraseña no son correctos  -  estado'
            })
        }

        // Verificar contraseña
        const validarPassword = bcryptjs.compareSync( password, user.password );

        if( !validarPassword ){
            return res.status(400).json({
                msg: 'Usuario / contraseña no son correctos  -  password'
            })
        }

        const token = generarJWT( user._id );

        res.json({
            user,
            token
        })

        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Contante con su administrador'
        })
    }


}


module.exports = {
    login
}