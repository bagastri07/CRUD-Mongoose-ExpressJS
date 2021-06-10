const express = require('express')
const router = express.Router()

//Controller
const AuthorController = require('..//controllers/authorController')

router.post('/', AuthorController.create)
router.get('/', AuthorController.read)
router.put('/:id', AuthorController.update)
router.delete('/:id', AuthorController.delete)

module.exports = router