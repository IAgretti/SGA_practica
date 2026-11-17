const bcrypt = require("bcrypt");
const Usuario = require("./models/Usuario");
const { default: mongoose } = require("mongoose");
require("dotenv").config()

async function nuevoUsuario() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        const email = "consulta@sga.com"
        const password = "otraClave123"
        
        const hash = await bcrypt.hash(password, 10)
        const nuevoU = new Usuario({
            nombre: "Usuario de consulta",
            email: email,
            password: hash,
            rol: "usuario"
        })
        await nuevoU.save()
        console.log("Usuario de consulta creado correctamente")
        console.log("Email: ", email)
    } catch (error) {
        console.error("Error al crea el usuario: ", error.message)
    } finally {
        await mongoose.disconnect()
    }
}

nuevoUsuario()

