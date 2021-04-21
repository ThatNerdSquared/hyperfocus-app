"use strict"
module.exports = (sequelize, DataTypes) => {
	let timerStatus = sequelize.define("timerStatus", {
		roomCode: {
			allowNull: false,
			type: DataTypes.STRING
		},
		minutes: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
		seconds: {
			allowNull: false,
			type: DataTypes.INTEGER
		},
		pom: {
			allowNull: false,
			type: DataTypes.BOOLEAN
		},
		isRunning: {
			allowNull: false,
			type: DataTypes.BOOLEAN
		},
		isIntervalSet: {
			allowNull: false,
			type: DataTypes.BOOLEAN
		},
		timerOptions: {
			allowNull: false,
			type: DataTypes.ARRAY(DataTypes.INTEGER)
		},
		participants: {
			allowNull: false,
			type: DataTypes.ARRAY(DataTypes.STRING)
		}
	})
	return timerStatus
}