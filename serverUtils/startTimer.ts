module.exports = async function startTimer(io, models, data) {
	let newPom
	data.pom === true ? newPom = false : newPom = true
	await models.timerStatus.update({
		minutes: data.minutes,
		seconds: 0,
		pom: newPom,
		isRunning: true
	}, {
		where: {
			roomCode: data.roomCode
		}
	})

	const newStatus = await models.timerStatus.findAll({
		where: {
			roomCode: data.roomCode
		}
	})

	const getClients = await models.client.findAll({
		where: {
			code: data.roomCode
		}
	})

	getClients.forEach(client => {
		io.to(client.socket).emit("timerStarted", { timerStatus: newStatus })
	})
}