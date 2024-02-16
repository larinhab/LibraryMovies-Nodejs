const ensureAuthenticated = require('../middleware/ensureAuthenticated')
const UserController = require("../controllers/userController")
const { Router } = require("express")


const usersRoutes = Router()
const userController = new UserController

usersRoutes.post('/', userController.create)
usersRoutes.put('/',ensureAuthenticated, userController.uptade)
usersRoutes.delete('/', ensureAuthenticated, userController.delete)

module.exports = usersRoutes