module.exports = async function deleteOption(io, models, data) {
	const oldData = await models.timerStatus.findAll({
		where: {
			roomCode: data.roomCode
		}
	})
	const oldArray = oldData[0].dataValues.timerOptions
	const newArray = []
	oldArray.forEach(item => {
		if (item != data.option) {
			newArray.push(item)
		}
	})

	await models.timerStatus.update({
		timerOptions: newArray
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
		io.to(client.socket).emit("optionDeleted", { timerStatus: newStatus })
	})
}