import React from "react"
import Timer from "./timer/Timer"
import io from "socket.io-client"

// const backendURL = "http://192.168.228.111:9000/api/"
const backendURL = "http://localhost:9000/"
// const backendURL = "http://192.168.228.111:9000"
const socket = io(backendURL)


type myState = {
	timerStatus: {
		id: number,
		minutes: number,
		seconds: number,
		pom: boolean,
		isRunning: boolean,
		isIntervalSet: boolean,
		timerOptions: Array<number>,
		participants: Array<string>,
	},
	users: {
		id: number,
		name: string,
		totalPomsToday: number,
		isOnline: boolean
	}[],
	newOption: string
}

class App extends React.Component<unknown, myState> {
	constructor(props: unknown) {
		super(props)
		this.state = {
			timerStatus: {
				id: 27,
				minutes: 10101,
				seconds: 42,
				pom: false,
				isRunning: false,
				isIntervalSet: false,
				timerOptions: [],
				participants: [],
			},
			users: [],
			newOption: ""
		}
		this.startTimer = this.startTimer.bind(this)
		this.toggleRunning = this.toggleRunning.bind(this)
		this.handleNewStatus = this.handleNewStatus.bind(this)
		this.formChange = this.formChange.bind(this)
		this.handleAddOption = this.handleAddOption.bind(this)
	}
	
	formChange(event: any) {
		const name = event.target.name
		const value = event.target.value
		this.setState({ [name]: value })
	}

	async startTimer(event: any) {
		event.preventDefault()
		let newMinutes = event.target.textContent
		let id = event.target.id
		let data = {
			id: id,
			minutes: newMinutes,
		}
		socket.emit("startTimer", data)
		socket.emit("beginTickTock", id)
	}

	componentDidMount() {
		socket.emit("join")
		socket.on("connectionData", this.handleNewStatus)
		socket.on("timerStarted", this.handleNewStatus)
		socket.on("timerToggled", this.handleNewStatus)
		socket.on("timerGoTickTock", this.handleNewStatus)
		socket.on("optionAdded", this.handleNewStatus)
	}

	handleNewStatus(data: any) {
		const dataArray = data.timerStatus
		const newStatus = dataArray[0]
		this.setState({
			timerStatus: newStatus
		})
	}

	handleAddOption(event: any) {
		event.preventDefault()
		let id = this.state.timerStatus.id
		let option = this.state.newOption
		let newOption = parseInt(option)
		let data = {
			id: id,
			option: newOption
		}
		console.log(data)
		socket.emit("addOption", data)
	}

	async toggleRunning(event: any) {
		event.preventDefault()
		let newRunning
		this.state.timerStatus.isRunning === true ? newRunning = false : newRunning = true
		let id = event.target.id
		let data = {
			id: id,
			isRunning: newRunning,
		}
		socket.emit("toggleTimer", data)
	}

	render() {
		function numDigits(x: number) {
			return Math.max(Math.floor(Math.log10(Math.abs(x))), 0) + 1;
		}
		let status = this.state.timerStatus
		let minutes
		let seconds
		let statusText
		numDigits(status.minutes) <= 1 ? minutes = `0${status.minutes}` : minutes = status.minutes
		numDigits(status.seconds) <= 1 ? seconds = `0${status.seconds}` : seconds = status.seconds
		this.state.timerStatus.isRunning === true ? statusText = "true" : statusText = "false"
		return (
			<div>
				<Timer
					timerOptions={status.timerOptions}
					id={status.id}
					startTimer={this.startTimer}
					toggleRunning={this.toggleRunning}
					formChange={this.formChange}
					newOption={this.state.newOption}
					handleAddOption={this.handleAddOption}
				/>
				<h1>{`${minutes}:${seconds}`}</h1>
				<p>Status: {statusText}</p>
			</div>
		)
	}
}

export default App