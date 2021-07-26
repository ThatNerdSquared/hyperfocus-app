'use strict'
module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.createTable("hyperfocus-clients-db", {
			code: {
				allowNull: false,
				type: Sequelize.STRING
			},
			name: {
				allowNull: false,
				type: Sequelize.STRING
			},
			socket: {
				allowNull: false,
				type: Sequelize.STRING
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
		return queryInterface.dropTable("hyperfocus-clients-db");
	}
}
