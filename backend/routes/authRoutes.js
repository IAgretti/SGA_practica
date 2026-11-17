const express = require("express") // importamos express para crear el router
const router = express.Router() // creamos un router para manejar las rutas de autenticación

const {login} = require("../controllers/authController")

// POST /auth/login
router.post("/login", login) // definimos la ruta para el login, que llama a la función login del controlador

module.exports = router  // exportamos el router para que pueda ser usado en otros archivos, como server.js