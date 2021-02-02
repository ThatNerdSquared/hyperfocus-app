'use strict'
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("hyperfocus-users-db", {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING
			},
			totalPomsToday: {
				allowNull: false,
				type: Sequelize.INTEGER
			},
			isOnline: {
				allowNull: false,
				type: Sequelize.BOOLEAN
			}
		})
	},
	down: (queryInterface, Sequelize) => {
		return queryInterface.dropTable("hyperfocus-users-db");
	}
}