const jwt = require("jsonwebtoken")

const verificarToken = (req, res, next) => { // Middleware para verificar el token JWT en las solicitudes entrantes
    try{
        const authHeader = req.headers.authorization // Se espera que el token se envíe en el encabezado de autorización con el formato "Bearer <token>"

        if (!authHeader || !authHeader.startsWith("Bearer ")) { // Si no hay encabezado de autorización o no tiene el formato correcto, se devuelve un error 401
            return res.status(401).json({
                mensaje: "Acceso no autorizado"
            })
        }
        const token = authHeader.split(" ")[1] // Extraemos el token del encabezado de autorización

        const usuario = jwt.verify( // Verificamos el token usando la clave secreta definida en las variables de entorno. Si el token es válido, se decodifica y se obtiene la información del usuario.
            token,
            process.env.JWT_SECRET
        )

        req.usuario = usuario // Agregamos la información del usuario decodificada al objeto de solicitud para que esté disponible en los controladores posteriores
        next() // Llamamos a next() para pasar al siguiente middleware o controlador en la cadena de ejecución
    } catch (error) {
        return res.status(401).json({
            mensaje: "Token inválido o expirado"
        })
    }
}

module.exports = { verificarToken }