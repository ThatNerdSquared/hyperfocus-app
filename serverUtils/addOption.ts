module.exports = async function addOption(io, models, data) {
	const { id, option } = data
	let oldData = await models.timerStatus.findAll()
	let oldArray = oldData[0].dataValues.timerOptions
	let newArray = []
	oldArray.forEach(item => newArray.push(item))
	newArray.push(option)
	const newData = await models.timerStatus.update({
		timerOptions: newArray
	}, {
		where: {
			id: id
		}
	})
	const newStatus = await models.timerStatus.findAll()
	io.emit("optionAdded", { timerStatus: newStatus })
}