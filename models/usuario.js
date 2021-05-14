
const { model, Schema } = require('mongoose');


const UsuarioSchema = new Schema({

    nombre:{
        type: String,
        required: [true, 'el nombre es obligatorio']
    },

    email:{
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },

    password:{
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },

    img:{
        type: String
    },

    role:{
        type: String,
        required: true,
        // enum:['ADMIN_ROLE', 'USER_ROLE']
    },

    estado:{
        type: Boolean,
        default: true
    },

    google:{
        type: Boolean,
        default: false
    }

})

UsuarioSchema.methods.toJSON = function(){
    const { __v, _id, password, ...user } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model( 'Usuario', UsuarioSchema );