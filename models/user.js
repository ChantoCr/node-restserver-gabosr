
const { Schema, model } = require('mongoose');

const UserSchema = Schema ({
    name: {
        type:String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type:String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password: {
        type:String,
        required: [true, 'La contraseña es obligatorio'],
    },
    img: {
        type:String,
    },
    rol: {
        type:String,
        required: true,
        enum: ['ADMIN_ROLE', 'USER_ROLE']
    },
    status: {
        type:Boolean,
        default:true
    },
    google: {
        type:Boolean,
        default:false
    }
});

UserSchema.methods.toJSON = function() {
    const { __v, password, ...user } = this.toObject();
    return user
}

module.exports = model( 'Users', UserSchema );