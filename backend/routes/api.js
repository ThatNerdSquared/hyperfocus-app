let express = require("express")
let router = express.Router()
let databaseController = require("../controllers/databaseController")

router.get("/timer", databaseController.getTimerStatus)
router.post("/timer", databaseController.startPom)
router.post("/timer/resumepom", databaseController.resumePom)

module.exports = router