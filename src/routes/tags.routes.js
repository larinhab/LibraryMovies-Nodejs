const ensureAuthenticated = require('../middleware/ensureAuthenticated')
const TagsController = require("../controllers/tagsController")
const { Router } = require("express")

const tagsRoutes = Router()
const tagsController = new TagsController()

tagsRoutes.get('/', ensureAuthenticated, tagsController.index)

module.exports = tagsRoutes