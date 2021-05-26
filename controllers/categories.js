const { Categoria } = require('../models');

const obtenerCategorias = async(req, res) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, categorias ] = await Promise.all([      // Una mejor forma ya que como una promesa no depende de la otra no vale la pena esperar
        Categoria.countDocuments(query),                  // a que se resuelva una para luego ejecutar la otra. Promise all ejecuta las dos promesas al tiempo
        Categoria.find(query)                               // y resuelve cuando las dos se hayan resuelto
            .limit( +limite )
            .skip( +desde )
            .populate('usuario', 'nombre')
    ])

    res.status(200).json({
        total,
        categorias,
    });

}

const obtenerCategoria = async(req, res) => {

    const id = req.params.id;

    const categoria = await Categoria.findById( id )
                                     .populate( 'usuario', 'nombre' );

    res.json(categoria);

}

const crearCategoria = async( req, res ) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB =  await Categoria.findOne({ nombre });

    if( categoriaDB ){
        return res.status(400).json({
            msg: `La categoria ${ nombre } ya existe`
        })
    }

    const data = {
        nombre,
        usuario: req.user._id
    }

    const categoria = new Categoria( data );

    await categoria.save();

    res.status(201).json( categoria );

}

const actualizarCategoria = async( req, res ) => {

    const id = req.params.id;
    const { estado, usuario, ...data } = req.body;

    data.nombre  =  data.nombre.toUpperCase();
    data.usuario = req.user._id;

    const categoria = await Categoria.findByIdAndUpdate( id, data, { new: true } );

    res.json( categoria );

}

const borrarCategoria = async( req, res ) => {

    const id = req.params.id;

    const categoria = await Categoria.findByIdAndUpdate( id, { estado: false }, { new: true } );

    res.json( categoria );

}

module.exports={
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
}