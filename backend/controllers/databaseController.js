const models = require("../models")

exports.getTimerStatus = function(req, res, next) {
	res.set("Access-Control-Allow-Origin", "*") 
	return models.timerStatus.findAll().then(timerStatus => {
		if (timerStatus == "") {
			return models.timerStatus.create({
				minutes: 420,
				pom: false,
				isRunning: false,
				timerOptions: [15, 25, 50, 90],
				participants: []
			}).then(timerStatus => {
				console.log(timerStatus)
				res.send(JSON.stringify({ data: timerStatus }))
			})
		}
		else {
			console.log(timerStatus)
			return res.send(JSON.stringify({ data: timerStatus }))
		}
	})
}

exports.startPom = function(req, res, next) {
	res.set("Access-Control-Allow-Origin", "*") 
	let data = req.body
	return models.timerStatus.update({
		minutes: data.minutes,
		pom: true,
		isRunning: true
	}, {
		where: {
			id: 1
		}
	}).then(timerStatus => {
		console.log(timerStatus)
		res.send("done")
	})
}