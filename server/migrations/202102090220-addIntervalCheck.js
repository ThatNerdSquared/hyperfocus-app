'use strict'
module.exports = {
	up: (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.addColumn(
				"timerStatuses",
				"isIntervalSet",
				{
					type: Sequelize.BOOLEAN,
					allowNull: true,
				}
			)
		])
	},
	down: (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.removeColumn("timerStatuses", "isIntervalSet")
		])
	}
}