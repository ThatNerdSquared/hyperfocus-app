const models = require("../models")

exports.getTimerStatus = function(req, res, next) {
	res.set("Access-Control-Allow-Origin", "*") 
	return models.timerStatus.findAll().then(timerStatus => {
		res.send(JSON.stringify({ data: timerStatus }))
	})
}