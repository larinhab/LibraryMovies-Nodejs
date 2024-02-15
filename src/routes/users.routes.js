const { Router } = require("express")
const UserController = require("../controllers/userController")

const usersRoutes = Router()
const userController = new UserController

usersRoutes.post('/', userController.create)
usersRoutes.put('/:id', userController.uptade)
usersRoutes.delete('/:id', userController.delete)

module.exports = usersRoutes