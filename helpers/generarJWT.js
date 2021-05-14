const jwt = require('jsonwebtoken');


const generarJWT = ( uid = '' ) => {

    try {
        const token = jwt.sign( { uid }, process.env.SECRET_KEY, {
            expiresIn: '2h'
        } );

        return token
        
    } catch (error) {
        console.log(error);
    }

}

module.exports = generarJWT;