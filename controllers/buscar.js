
const { ObjectId } = require('mongoose').Types;
const { Usuario, Categoria, Product } = require('../models');

const coleccionesValidas = [
    'usuarios',
    'products',
    'categorias',
    'roles'
]

const buscarUsuarios = async( termino = '', res ) => {

    const esMongoID = ObjectId.isValid( termino );

    if( esMongoID ){
        const usuario = await Usuario.findById( termino );
        return res.json( {
            results: usuario ? [ usuario ]: []
        } );
    }

    const regex = new RegExp( termino, 'i' );

    const search = {
        $or: [{ nombre: regex }, { email: regex }],
        $and:[ { estado: true } ]
    }

    const [ total, usuarios ] = await Promise.all([
        Usuario.countDocuments( search ),
        Usuario.find( search )
    ])

    res.json( {
        total,
        results: usuarios
    } );

}

const busquedaGenerica = ( termino = '', res ) => {

    return async( modelo ) => {
        const esMongoID = ObjectId.isValid( termino );

        if( esMongoID ){
            const respuesta = await modelo.findById( termino );
            return res.json( {
                results: respuesta ? [ respuesta ]: []
            } );
        }

        const regex = new RegExp( termino, 'i' );

        const search = { nombre: regex, estado: true}

        const [ total, datos ] = await Promise.all([
            modelo.countDocuments( search ),
            modelo.find( search )
        ])

        res.json( {
            total,
            results: datos
        } );

    }

}

const buscar = ( req, res ) => {

    const { coleccion, termino } = req.params;

    if(!coleccionesValidas.includes( coleccion )){
        return res.status(400).json({
            msg: `Las colecciones permitidas son ${ coleccionesValidas }`
        })
    }

    const buscarProductos = busquedaGenerica( termino, res );
    const buscarCategoria = busquedaGenerica( termino, res );

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios( termino, res );
        break;

        case 'products':
            buscarProductos( Product );
        break;

        case 'categorias':
            buscarCategoria( Categoria );
        break;

        default:
            res.status(500).json({
                msg: 'Problemas al realizar la búsqueda'
            })
    }

};

module.exports = {
    buscar
}