const { Router } = require("express")

const usersRoutes = require("./users.routes") // IMPORTANDO ROTA DO USUARIO
const notesRoutes = require("./notes.routes") 

const routes = Router()

// REDIRECIONANDO 

routes.use("/users", usersRoutes)
routes.use("/notes", notesRoutes)

module.exports = routes;