const verificarRol = (...RolesPermitidos) => { // ...RolesPermitidos es un array que contiene los roles permitidos para acceder a la ruta
    return (req, res, next) => {
        if (!req.usuario) {
            return res.status(401).json({
                mensaje: "Primero debés autenticarte"
            })
        }

        if (!RolesPermitidos.includes(req.usuario.rol)) { // Si el rol del usuario no está en la lista de roles permitidos, se devuelve un error 403
            return res.status(403).json({
                mensaje: "No tenés permisos para esta operación"
            })
        }
        next()
    }
}

module.exports = { verificarRol }