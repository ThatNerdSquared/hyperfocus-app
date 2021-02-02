let express = require("express")
let router = express.Router()
let databaseController = require("../controllers/databaseController")

router.get("/timer", databaseController.getTimerStatus)

module.exports = router