module.exports = async function socketJoin(io, socket, models, data) {
	let timerStatus = await models.timerStatus.findAll({
		where: {
			roomCode: data.roomCode
		}
	})
	if (timerStatus == "") {
		io.to(socket.id).emit("private", { roomDoesNot: true })
		return
	}

	await models.client.create({
		code: data.roomCode,
		name: data.loginName,
		socket: socket.id
	})

	const getClients = await models.client.findAll({
		where: {
			code: data.roomCode
		}
	})

	const checkCurrentUser = await models.user.findAll({
		where: {
			name: data.loginName
		}
	})
	if (checkCurrentUser == "") {
		await models.user.create({
			name: data.loginName,
			totalPomsToday: 0,
			isOnline: true
		})
	}
	else {
		await models.user.update({
			isOnline: true
		}, {
			where: {
				name: data.loginName
			}
		})
	}

	const newParticipants = []
	getClients.forEach(x => {
		newParticipants.includes(x.name) === true ? null : newParticipants.push(x.name)
	})
	newParticipants.includes(data.loginName) === true ? null : newParticipants.push(data.loginName)
	await models.timerStatus.update({
		participants: newParticipants
	}, {
		where: {
			roomCode: data.roomCode
		}
	})
	timerStatus = await models.timerStatus.findAll({
		where: {
			roomCode: data.roomCode
		}
	})

	const currentUser = await models.user.findAll({
		where: {
			name: data.loginName
		}
	})

	getClients.forEach(client => {
		io.to(client.socket).emit("connectionData", { timerStatus: timerStatus })
	})
	io.to(socket.id).emit("private", { currentUser: currentUser, isLoggedIn: true })
}