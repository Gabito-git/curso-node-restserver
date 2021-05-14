const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');

const Usuario = require('../models/usuario');



const usersGet = async(req, res) => {
    // const query = req.query;

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    // const usuarios = await Usuario.find(query)
    //                         .limit( +limite )
    //                         .skip( +desde );

    // const total = await Usuario.countDocuments(query);

    const [ total, usuarios ] = await Promise.all([      // Una mejor forma ya que como una promesa no depende de la otra no vale la pena esperar
        Usuario.countDocuments(query),                  // a que se resuelva una para luego ejecutar la otra. Promise all ejecuta las dos promesas al tiempo
        Usuario.find(query)                               // y resuelve cuando las dos se hayan resuelto
            .limit( +limite )
            .skip( +desde ),
    ]) 

    res.status(200).json({
        total,
        usuarios,
    });

    
};

const usersPost = async(req, res) => {   

    const { nombre, email, password, role } = req.body;

    const usuario = new Usuario( { nombre, email, password, role } );

    // Encriptar password
    const salt = bcryptjs.genSaltSync();
    usuario.password =  bcryptjs.hashSync( password, salt );

    await usuario.save();

    res.status(201).json({
        ok: true,
        usuario
    });
};

const usersPut = async(req, res) => {
    const id = req.params.id;

    const { _id, password, google, ...rest } = req.body;

    if( password ){
        // Encriptar password
        const salt = bcryptjs.genSaltSync();
        rest.password =  bcryptjs.hashSync( password, salt );
    }

    const usuario = await Usuario.findByIdAndUpdate( id, rest, {new: true} );

    res.status(400).json({
        ok: true,
        usuario
    });
};

const usersDelete = async(req, res) => {

    const { id } = req.params;
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false }, { new: true } );

    res.json(usuario);
};

module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
};
