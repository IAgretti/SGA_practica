const mongoose = require("mongoose")

const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false // No se incluye en las consultas por defecto
    },
    rol: {
        type: String,
        enum: ["admin", "usuario"], // Definimos los roles permitidos
        default: "usuario"
    }
}, {
        versionKey: false
    
})

const Usuario = mongoose.model("Usuario", usuarioSchema); // Creamos el modelo de usuario a partir del esquema definido
module.exports = Usuario