const express = require('express')
const router = express.Router()
const IdeiaController = require('../controllers/IdeiaController')

router.get('/add', IdeiaController.createIdeiaSave)
router.post('/add', IdeiaController.createIdeiaSave)
router.post('/remove', IdeiaController.removeIdeia)
router.get('/edit/:id', IdeiaController.uptadeIdeia)
router.get('/ideia', IdeiaController.createIdeiaSave)
router.get('/dashboard', IdeiaController.dashboard)
router.get('/', IdeiaController.showIdeias)

module.exports = router