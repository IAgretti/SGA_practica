const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const login = async (req, res) => {
    try {
        // 1. Obtener los datos enviados desde el cliente
        const {email, password} = req.body

        // 2. Verificar que estén presentes
        if (!email || !password) {
            return res.status(400).json({
                mensaje: "Debés ingresar email y contraseña"
            })
        }

        // 3. Buscar al usuario por email
        // Cómo password tiene select : false, debemos solicitarlo expresamente
        const usuario = await Usuario
        .findOne({ email: email.trim().toLowerCase()}) // Normalizamos el email para evitar problemas de mayúsculas/minúsculas y espacios
        .select("+password")  // Solicitamos que se incluya el campo password en la consulta

        // 4. Verificar si existe el usuario
        if (!usuario) {
            return res.status(401).json({
                mensaje: "Email o contraseña incorrectos"
            })
        }

        // 5. Comparar la contraseña con el hash almacenado
        const coincide = await bcrypt.compare(
            password,
            usuario.password  
        )
        if (!coincide) {
            return res.status(401).json({
                mensaje: "Email o contraseña incorrectos"
            })
        }
        // si coincide la contraseña, generamos un token JWT
        const token = jwt.sign({        
        id: usuario._id,   // Incluimos el ID del usuario en el payload del token
        rol: usuario.rol   
    },    
        process.env.JWT_SECRET,   // Clave secreta para firmar el token, debe estar en el archivo .env
    {     
        expiresIn: process.env.JWT_EXPIRES_IN || "2h"   // Tiempo de expiración del token, por defecto 2 horas si no se especifica en .env  
    });
        // 6. Login correcto
        return res.status(200).json({ 
            mensaje: "Login correcto", 
            token,
            usuario: { // Enviamos solo los datos necesarios, sin la contraseña
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            }
        })

    } catch (error) {
        console.error("Error de login: ", error)
        return res.status(500).json({  
            mensaje: "Error interno del servidor"
        })
    }
}

module.exports = {login}
