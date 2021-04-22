module.exports = async function logMeOut(io, socket, models, data) {
	if (data.user === undefined) {
		return
	}

	const user = data.user[0]
	await models.user.update({
		isOnline: false
	}, {
		where: {
			id: user.id
		}
	})

	const removeClient = await models.client.findAll({
		where: {
			socket: socket.id
		}
	})
	removeClient.forEach(async client => {
		await client.destroy()
	})

	const getClients = await models.client.findAll({
		where: {
			code: data.roomCode
		}
	})
	const newParticipants = []
	getClients.forEach(client => {
		if (newParticipants.includes(client.name) === false) {
			client.name === user.name ? null : newParticipants.push(client.name)
		}
	})
	await models.timerStatus.update({
		participants: newParticipants
	}, {
		where: {
			roomCode: data.roomCode
		}
	})

	const timerStatus = await models.timerStatus.findAll({
		where: {
			roomCode: data.roomCode
		}
	})

	getClients.forEach(client => {
		io.to(client.socket).emit("userLoggedOut", { timerStatus: timerStatus })
	})
}