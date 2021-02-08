'use strict'
module.exports = {
	up: (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.addColumn(
				"timerStatuses",
				"seconds",
				{
					type: Sequelize.INTEGER,
					allowNull: true,
				}
			)
		])
	},
	down: (queryInterface, Sequelize) => {
		return Promise.all([
			queryInterface.removeColumn("timerStatuses", "seconds")
		])
	}
}