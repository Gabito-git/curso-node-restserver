
const { Product } = require('../models');

const obtenerProductos = async( req, res ) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, productos ] = await Promise.all([      // Una mejor forma ya que como una promesa no depende de la otra no vale la pena esperar
        Product.countDocuments(query),                  // a que se resuelva una para luego ejecutar la otra. Promise all ejecuta las dos promesas al tiempo
        Product.find(query)                               // y resuelve cuando las dos se hayan resuelto
            .limit( +limite )
            .skip( +desde )
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
    ])

    res.status(200).json({
        total,
        productos,
    });

}

const obtenerProducto  =async( req, res ) => {

    const { id } = req.params;

    const producto = await Product.findById( id )
                                  .populate('usuario', 'nombre')
                                  .populate( 'categoria', 'nombre' )

    res.json( producto );


}

const crearProducto = async( req, res ) => {

    const { estado, usuario, ...data } = req.body;

    const productoDB = await Product.findOne({ nombre: data.nombre });

    if( productoDB){
        return res.status(400).json({
            msg: `El producto ${ data.nombre } ya existe`
        })
    }

    data.usuario = req.user._id;
    data.nombre  = data.nombre.toUpperCase();

    const producto = new Product( data );

    await producto.save();

    res.status(201).json( producto );   

}

const actualizarProducto = async( req, res ) => {
    
    const { estado, usuario, ...data } = req.body;
    
    if( !Object.keys( data ).length ){
        return res.status(400).json({
            msg: 'No hay ningún campo para actualizar'
        })
    }

    if( data.nombre ){
        data.nombre = data.nombre.toUpperCase();
    }

    const { id } = req.params;

    const producto = await Product.findByIdAndUpdate(id, data, { new: true});

    res.json( producto );

}

const borrarProducto = async( req, res ) => {

    const { id } = req.params;

    const producto = await Product.findByIdAndUpdate( id, { estado: false }, { new: true } );

    res.json( producto )

}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
}