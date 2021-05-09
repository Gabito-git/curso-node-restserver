const Role = require('../models/role');
const Usuario = require('../models/usuario');


const roleValidator = async(role = '') => {
    const roleExists = await Role.findOne({role});
    if(!roleExists){
        throw new Error(`El role ${ role } no está registrado en DB` )
    }
}

const emailExists = async( email ) => {

    const emailInDb =  await Usuario.findOne({ email });

    if( emailInDb ){
        throw new Error(`El correo: ${ email } ya se encuentra registrado en la base de datos`);
    }

}


const userByID = async( id ) => {
    
    try {
        
        const user =  await Usuario.findById( id );
        if( !user ){
            throw new Error(`El usuario con el id: ${ id } no existe en la base de datos`);
        }
        
    } catch (error) {
        throw new Error(`El usuario con el id: ${ id } no existe en la base de datos`)
    }



}

module.exports = {
    roleValidator,
    emailExists,
    userByID
}