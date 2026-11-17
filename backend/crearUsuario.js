const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

require("dotenv").config()

const Usuario = require("./models/Usuario")

async function crearUsuario(){
    try {
        await mongoose.connect(process.env.MONGO_URI)

        const email = "admin@sga.com"
        const password = "claveDePrueba123!"

        // Generar el hash de la contraseña
        const hash = await bcrypt.hash(password, 10) // 10 es el número de rondas de salting, puedes ajustarlo según tus necesidades

        // Crear el usuario con la contraseña hasheada
        const usuario = new Usuario({
            nombre: "Administrador de prueba",
            email: email, 
            password: hash,
            rol: "admin"
        })
        await usuario.save()

        console.log("Usuario de prueba creado correctamente")
        console.log("Email:", email)
    } catch (error) {
        console.error("Error al crear el usuario:", error.message)
    } finally {
        await mongoose.disconnect()
    }
}

crearUsuario()