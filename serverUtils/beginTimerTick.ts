module.exports = async function beginTimerTick(io, models) {
	setInterval(async () => {
		const check = await models.timerStatus.findAll({
			where: {
				isRunning: true
			}
		})
		check.forEach(async room => {
			const min = room.minutes
			const sec = room.seconds
			const id = room.id
			const roomCode = room.roomCode

			if (min === 0 && sec === 0) {
				await models.timerStatus.update({
					minutes: 0,
					seconds: 0,
					isRunning: false,
				}, {
					where: {
						id: id
					}
				})

				const newStatus = await models.timerStatus.findAll({
					where: {
						id: id
					}
				})

				const getClients = await models.client.findAll({
					where: {
						code: roomCode
					}
				})
				getClients.forEach(client => {
					io.to(client.socket).emit("timerGoTickTock", { timerStatus: newStatus, pomDone: true })
				});
			}
			else {
				let finalMin
				let finalSec
				if (sec-1 < 0) {
					finalSec = 59
					finalMin = min - 1
				}
				else {
					finalSec = sec - 1
					finalMin = min
				}
				await models.timerStatus.update({
					minutes: finalMin,
					seconds: finalSec
				}, {
					where: {
						id: id
					}
				})
				const getClients = await models.client.findAll({
					where: {
						code: roomCode
					}
				})
				const newStatus = await models.timerStatus.findAll({
					where: {
						roomCode: roomCode
					}
				})
				getClients.forEach(client => {
					io.to(client.socket).emit("timerGoTickTock", { timerStatus: newStatus })
				})
			}
		})
	}, 1000);
}