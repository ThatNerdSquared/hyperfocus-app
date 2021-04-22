module.exports = async function toggleTimer(io, models, data) {
	await models.timerStatus.update({
		isRunning: data.isRunning
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
		io.to(client.socket).emit("timerToggled", { timerStatus: newStatus })
	})
}