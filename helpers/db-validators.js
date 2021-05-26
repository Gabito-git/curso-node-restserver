const Role = require('../models/role');
const { Usuario, Categoria, Product } = require('../models');


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

const existeCategoria = async( id ) => {

    try {
        
        const categoria = await Categoria.findById( id );

        if( !categoria ){
            throw new Error( `La categoria con el id ${ id } no existe en la base de datos` )
        }

    } catch (error) {
        console.log(error);
        throw new Error( `La categoria con el id ${ id } no existe en la base de datos` )
    }

}

const existeProducto = async( id ) => {

    try {
        
        const producto = await Product.findById( id );

        if( !producto ){
            throw new Error( `El producto con el id ${ id } no existe en la base de datos` )
        }

    } catch (error) {
        console.log(error);
        throw new Error( `El producto con el id ${ id } no existe en la base de datos` )
    }

}

module.exports = {
    roleValidator,
    emailExists,
    userByID,
    existeCategoria,
    existeProducto
}