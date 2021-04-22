module.exports = async function removeStrayItems(models) {
	const strayStatuses = await models.timerStatus.findAll({
		where: {
			roomCode: null
		}
	})
	strayStatuses.forEach(async status => {
		await status.destroy()
	});

	const timerStatus = await models.timerStatus.findAll()
	if (timerStatus == "") {
		await models.timerStatus.create({
			id: 42,
			roomCode: "bigTest",
			minutes: 0,
			seconds: 0,
			pom: false,
			isRunning: false,
			isIntervalSet: false,
			timerOptions: [15, 25, 50, 90],
			participants: []
		})
	}

	const strayClients = await models.client.findAll()
	strayClients.forEach(async client => {
		await client.destroy()
	});
}
