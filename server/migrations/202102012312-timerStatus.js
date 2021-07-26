'use strict'
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("hyperfocus-app-db", {
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
			}
		})
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable("hyperfocus-app-db");
	}
}
