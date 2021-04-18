module.exports = async function deleteOption(io, models, data) {
	const { id, option } = data
	console.log(option)
	let oldData = await models.timerStatus.findAll()
	let oldArray = oldData[0].dataValues.timerOptions
	let newArray = []
	oldArray.forEach(item => {
		if (item != option) {
			newArray.push(item)
		}
	})
	console.log(newArray)
	const newData = await models.timerStatus.update({
		timerOptions: newArray
	}, {
		where: {
			id: id
		}
	})
	const newStatus = await models.timerStatus.findAll()
	io.emit("optionDeleted", { timerStatus: newStatus })
}