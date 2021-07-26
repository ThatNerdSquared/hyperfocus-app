const models = require("../models")

exports.getTimerStatus = function(req, res, next) {
	res.set("Access-Control-Allow-Origin", "*") 
	return models.timerStatus.findAll().then(timerStatus => {
		if (timerStatus == "") {
			return models.timerStatus.create({
				id: 42,
				minutes: 420,
				seconds: 69,
				pom: false,
				isRunning: false,
				timerOptions: [15, 25, 50, 90],
				participants: []
			}).then(timerStatus => {
				res.send(JSON.stringify({ data: timerStatus }))
			})
		}
		else {
			return res.send(JSON.stringify({ data: timerStatus }))
		}
	})
}

exports.startPom = function(req, res, next) {
	res.set("Access-Control-Allow-Origin", "*") 
	let data = req.body
	return models.timerStatus.update({
		minutes: data.minutes,
		seconds: 0,
		pom: true,
		isRunning: true
	}, {
		where: {
			id: data.id
		}
	}).then(timerStatus => {
		console.log(timerStatus)
		res.send("done")
	})
}

exports.resumePom = function(req, res, next) {
	res.set("Access-Control-Allow-Origin", "*") 
	let data = req.body
	return models.timerStatus.update({
		isRunning: data.isRunning
	}, {
		where: {
			id: data.id
		}
	}).then(timerStatus => {
		console.log(timerStatus)
		res.send("done")
	})
}