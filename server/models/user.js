"use strict"
module.exports = (sequelize, DataTypes) => {
    let user = sequelize.define("user", {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4
		},
		name: {
			allowNull: false,
			type: DataTypes.STRING
		},
		totalPomsToday: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
		isOnline: {
			allowNull: false,
			type: DataTypes.BOOLEAN
		},
		createdAt: {
			allowNull: false,
			type: DataTypes.DATE
		},
		updatedAt: {
			allowNull: false,
			type: DataTypes.DATE
		}
	})
	return user
}
