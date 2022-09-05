const express = require('express')
const router = express.Router()

//Controller
const toughtsController = require('../controllers/ToughtController')

//helpers

const checkAuth = require('../helpers/auth').checkAuth

router.get('/add', checkAuth, toughtsController.createTouth)
router.post('/add', checkAuth, toughtsController.createTouthSave)
router.get('/edit/:id', checkAuth, toughtsController.updateTought)
router.post('/edit', checkAuth, toughtsController.updateToughtSave)
router.post('/remove', checkAuth, toughtsController.removeTouth)
router.get('/dashboard', checkAuth, toughtsController.dashboard)

router.get('/', toughtsController.showToughts)



module.exports = router