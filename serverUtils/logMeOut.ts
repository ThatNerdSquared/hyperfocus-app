module.exports = async function logMeOut(io, models, user) {
	const { id, name, totalPomsToday, isOnline } = user
	const userID = user[0].id
	const logOutUser = await models.user.update({
		isOnline: false
	}, {
		where: {
			id: userID
		}
	})
	const newUsers = await models.user.findAll()
	io.emit("userLoggedOut", { users: newUsers })
}