const ensureAuthenticated = require('../middleware/ensureAuthenticated')
const NotesController = require("../controllers/notesController")
const { Router } = require("express")

const notesRoutes = Router()
const notesController = new NotesController

notesRoutes.use(ensureAuthenticated)

notesRoutes.post('/', notesController.create)
notesRoutes.delete('/:id', notesController.delete)
notesRoutes.get('/:id', notesController.show)
notesRoutes.get('/', notesController.index)


module.exports = notesRoutes