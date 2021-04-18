module.exports = async function socketJoin(io, socket, models, username) {
	let timerStatus = await models.timerStatus.findAll()
	if (timerStatus == "") {
		await models.timerStatus.create({
			id: 42,
			minutes: 420,
			seconds: 69,
			pom: false,
			isRunning: false,
			isIntervalSet: false,
			timerOptions: [15, 25, 50, 90],
			participants: []
		})
	}
	else {
		const checkPeople = await models.user.findAll({
			where: {
				isOnline: true
			}
		})
		if (checkPeople == "") {
			await models.timerStatus.update({
				isRunning: false,
				isIntervalSet: false
			}, {
				where: {
					isRunning: true
				}
			})
		}
	}
	let users = await models.user.findAll()
	let checkCurrentUser = await models.user.findAll({
		where: {
			name: username
		}
	})
	if (checkCurrentUser == "") {
		await models.user.create({
			name: username,
			totalPomsToday: 0,
			isOnline: true
		})
	}
	else {
		await models.user.update({
			isOnline: true
		}, {
			where: {
				name: username
			}
		})
	}
	users = await models.user.findAll()
	timerStatus = await models.timerStatus.findAll()
	let currentUser = await models.user.findAll({
		where: {
			name: username
		}
	})
	io.emit("connectionData", { timerStatus: timerStatus, isLoggedIn: true, users: users })
	io.to(socket.id).emit("private", { currentUser: currentUser })
}