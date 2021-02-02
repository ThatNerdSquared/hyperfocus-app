"use strict"
module.exports = (sequelize, DataTypes) => {
	let timerStatus = sequelize.define("timerStatus", {
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
	return timerStatus
}