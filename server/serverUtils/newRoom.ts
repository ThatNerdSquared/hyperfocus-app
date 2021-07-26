module.exports = async function newRoom(io, socket, models, code) {
	const timerStatus = await models.timerStatus.findAll({
		where: {
			roomCode: code
		}
	})
	if (timerStatus == "") {
		await models.timerStatus.create({
			roomCode: code,
			minutes: 0,
			seconds: 0,
			pom: false,
			isRunning: false,
			isIntervalSet: false,
			timerOptions: [15, 25, 50, 90],
			participants: []
		})
		io.to(socket.id).emit("private", { roomCreated: true })
	}
	else {
		io.to(socket.id).emit("private", { roomAlreadyExists: true })
	}
}
