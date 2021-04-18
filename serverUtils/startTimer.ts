module.exports = async function startTimer(io, models, data) {
	const { minutes, id, pom } = data
	let newPom
	pom === true ? newPom = false : newPom = true
	const newData = await models.timerStatus.update({
		minutes: minutes,
		seconds: 0,
		pom: newPom,
		isRunning: true
	}, {
		where: {
			id: id
		}
	})
	const newStatus = await models.timerStatus.findAll()
	io.emit("timerStarted", { timerStatus: newStatus })
}