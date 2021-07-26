'use strict'
module.exports = {
	up: (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.addColumn(
				"timerStatuses",
				"roomCode",
				{
					type: Sequelize.STRING,
					allowNull: true,
				}
			)
		])
	},
	down: (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.removeColumn("timerStatuses", "roomCode")
		])
	}
}