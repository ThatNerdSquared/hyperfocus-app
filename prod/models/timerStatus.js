"use strict"
module.exports = (sequelize, DataTypes) => {
	let timerStatus = sequelize.define("timerStatus", {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4
		},
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
	return timerStatus
}
