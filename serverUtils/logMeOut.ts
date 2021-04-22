module.exports = async function logMeOut(io, models, user) {
	if (user[0] === undefined) {
		return
	}
	const userID = user[0].id
	await models.user.update({
		isOnline: false
	}, {
		where: {
			id: userID
		}
	})
	const newUsers = await models.user.findAll()
	io.emit("userLoggedOut", { users: newUsers })
}