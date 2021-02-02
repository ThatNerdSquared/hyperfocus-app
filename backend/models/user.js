"use strict"
module.exports = (sequelize, DataTypes) => {
    let todo = sequelize.define("user", {
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
	return user
}