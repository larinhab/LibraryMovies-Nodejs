const { Router } = require("express")

const usersRoutes = require("./users.routes") // IMPORTANDO ROTA DO USUARIO
const notesRoutes = require("./notes.routes") 
const tagsRoutes = require("./tags.routes") 

const routes = Router()

// REDIRECIONANDO 

routes.use("/users", usersRoutes)
routes.use("/notes", notesRoutes)
routes.use("/tags", tagsRoutes)

module.exports = routes;