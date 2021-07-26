"use strict"
module.exports = (sequelize, DataTypes) => {
    let client = sequelize.define("client", {
		code: {
			allowNull: false,
			type: DataTypes.STRING
		},
		name: {
			allowNull: false,
			type: DataTypes.STRING
		},
		socket: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.STRING
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
	return client
}
