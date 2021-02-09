import React from "react"
import Timer from "./timer/Timer"
import io from "socket.io-client"

// const backendURL = "http://192.168.228.111:9000/api/"
// const backendURL = "http://localhost:9000/api/"
const backendURL = "http://192.168.228.111:9000"
const socket = io(backendURL)


type myState = {
	timerStatus: {
		id: number,
		minutes: number,
		seconds: number,
		pom: boolean,
		isRunning: boolean,
		timerOptions: Array<number>,
		participants: Array<string>,
	},
	users: {
		id: number,
		name: string,
		totalPomsToday: number,
		isOnline: boolean
	}[]
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
				timerOptions: [],
				participants: [],
			},
			users: []
		}
		// this.callAPI = this.callAPI.bind(this)
		this.startTimer = this.startTimer.bind(this)
		this.toggleRunning = this.toggleRunning.bind(this)
		this.handleNewStatus = this.handleNewStatus.bind(this)
	}

	async startTimer(event: any) {
		event.preventDefault()
		let newMinutes = event.target.textContent
		let id = event.target.id
		let data = {
			id: id,
			minutes: newMinutes,
		}
		// let res = await fetch(`${backendURL}timer`, {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json"
		// 	},
		// 	body: JSON.stringify(data),
		// })
		// console.log(res)
		socket.emit("startTimer", data)
		// this.callAPI()
	}

	// Calling the API. Top-level method.
	// callAPI() {
	// 	fetch(`${backendURL}timer`)
	// 		.then(response => response.json())
	// 		.then(response => {
	// 			const data = response.data
	// 			console.log("apicall")
	// 			let timerData = data[0]
	// 			console.log(timerData)
	// 			this.setState({
	// 				timerStatus: timerData
	// 			})
	// 		})
	// }

	componentDidMount() {
		socket.emit("join")
		socket.on("connectionData", this.handleNewStatus)
		socket.on("timerStarted", this.handleNewStatus)
		socket.on("timerToggled", this.handleNewStatus)
	}

	handleNewStatus(data: any) {
		const dataArray = data.timerStatus
		const newStatus = dataArray[0]
		console.log(newStatus)
		this.setState({
			timerStatus: newStatus
		})
	}

	async toggleRunning(event: any) {
		event.preventDefault()
		let newRunning
		this.state.timerStatus.isRunning === true ? newRunning = false : newRunning = true
		console.log(newRunning)
		let id = event.target.id
		let data = {
			id: id,
			isRunning: newRunning,
		}
		// let res = await fetch(`${backendURL}timer/resumepom`, {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json"
		// 	},
		// 	body: JSON.stringify(data),
		// })
		// console.log(res)
		socket.emit("toggleTimer", data)
		// this.callAPI()
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
				/>
				<h1>{`${minutes}:${seconds}`}</h1>
				<p>Status: {statusText}</p>
			</div>
		)
	}
}

export default App