const { request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');

const validarJWT = async( req = request, res, next ) => {

    const token = req.header('x-token');
    
    if(!token){
        return res.status(401).json({
            msg: "No hay token en la peticion"
        })
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRET_KEY );

        // Leer el usuario que corresponde al uid
        const user = await Usuario.findById( uid );        

        if(!user){
            return res.status(401).json({
                msg: 'Token no válido - Usuario no existe en DB'
            })
        }


        // Verificar si el uid tiene estado true

        if(!user.estado){
            return res.status(401).json({
                msg: 'Token no válido - Usuario con estado: false'
            })
        }

        req.user = user;
        next();
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: "Token no válido"
        })
        
    }
  

}

module.exports = validarJWT;