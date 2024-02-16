const SessionsController = require("../controllers/sessionsController")
const { Router } = require("express")

const sessionsController = new SessionsController()

const sessionsRoutes = Router()

sessionsRoutes.post("/", sessionsController.create)


module.exports = sessionsRoutes