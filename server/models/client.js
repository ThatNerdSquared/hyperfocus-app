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
		}
	})
	return client
}