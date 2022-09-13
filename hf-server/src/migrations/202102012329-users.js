'use strict'
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("users", {
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
		return queryInterface.dropTable("users");
	}
}
