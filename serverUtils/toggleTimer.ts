module.exports = async function toggleTimer(io, models, signal) {
	const { isRunning, id } = signal
	const newData = await models.timerStatus.update({
		isRunning: isRunning
	}, {
		where: {
			id: id
		}
	})
	const newStatus = await models.timerStatus.findAll()
	io.emit("timerToggled", { timerStatus: newStatus })
}