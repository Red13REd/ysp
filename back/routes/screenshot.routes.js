const Router = require('express')
const router = new Router()
const screenshotController = require('../conroller/screenshot.controller')

router.post('/screenshot', screenshotController.sendScreenshot)


module.exports = router