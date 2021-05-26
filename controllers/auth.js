const  bcryptjs  = require('bcryptjs');

const generarJWT = require('../helpers/generarJWT');
const { googleVerify } = require('../helpers/googleVerify');
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

const googleSignIn = async( req, res ) => {

    const { id_token } = req.body;

    try {

        const { nombre, img, email } = await googleVerify( id_token );

        let user = await Usuario.findOne({ email });

        if( !user ){

            const data ={
                nombre,
                img,
                email,
                password:'xxx',
                google: true
            }

            user = new Usuario( data );
            await user.save();
        }

        if( !user.estado ){
            return res.status(401).json({                
                msg: "Hable con su administrador, usuario bloqueado"
            })
        }

        const token = generarJWT( user._id );

        res.json({
            user,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Google token no reconocido'            
        })
        
    }  

}


module.exports = {
    login,
    googleSignIn
}