const { Router } = require("express")
const NotesController = require("../controllers/notesController")

const notesRoutes = Router()
const notesController = new NotesController

notesRoutes.post('/:id', notesController.create)
notesRoutes.delete('/:id', notesController.delete)
notesRoutes.get('/:id', notesController.show)
notesRoutes.get('/', notesController.index)


module.exports = notesRoutes