'use strict'
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("timerStatuses", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4
			},
			minutes: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			pom: {
				allowNull: false,
				type: Sequelize.BOOLEAN
			},
			isRunning: {
				allowNull: false,
				type: Sequelize.BOOLEAN
			},
			timerOptions: {
				allowNull: false,
				type: Sequelize.ARRAY(Sequelize.INTEGER)
			},
			participants: {
				allowNull: false,
				type: Sequelize.ARRAY(Sequelize.STRING)
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		})
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable("timerStatuses");
	}
}
