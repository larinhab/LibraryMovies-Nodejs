const { Router } = require("express")

const usersRoutes = require("./users.routes") // IMPORTANDO ROTA DO USUARIO

const routes = Router()

// REDIRECIONANDO 

routes.use("/users", usersRoutes)

module.exports = routes;