const UserAvatarController = require("../controllers/userAvatarController")
const ensureAuthenticated = require('../middleware/ensureAuthenticated') // PARA SABER QUEM É O USER
const UserController = require("../controllers/userController")

const uploadConfig = require("../configs/upload")
const { Router } = require("express")
const multer = require("multer")


const usersRoutes = Router()
const userController = new UserController()
const userAvatarController = new UserAvatarController()

const upload = multer(uploadConfig.MULTER)

usersRoutes.post('/', userController.create)
usersRoutes.put('/',ensureAuthenticated, userController.uptade)
usersRoutes.delete('/:id', ensureAuthenticated, userController.delete)
usersRoutes.patch('/avatar', ensureAuthenticated, upload.single("avatar"), userAvatarController.uptade) //PARA ATUALIZAR UM CAMPO ESPECIFICO (neste caso, avatar no user)

module.exports = usersRoutes