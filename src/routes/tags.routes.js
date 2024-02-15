const { Router } = require("express")
const TagsController = require("../controllers/tagsController")

const tagsRoutes = Router()
const tagsController = new TagsController

tagsRoutes.post('/', tagsController.index)

module.exports = tagsRoutes