const express = require('express')
const router = express.Router()

//Controller
const AuthorController = require('..//controllers/authorController')

router.post('/', AuthorController.create)
router.get('/', AuthorController.read)
router.put('/:id', AuthorController.update)
router.delete('/:id', AuthorController.delete)
router.post('/addbook/:id', AuthorController.addBook)
router.delete('/delbook/:id1/:id2', AuthorController.deleteBook)

module.exports = router