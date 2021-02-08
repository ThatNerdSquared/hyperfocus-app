import React from "react"
import Timer from "./timer/Timer"

// const backendURL = "http://192.168.228.111:9000/api/timer"
const backendURL = "http://localhost:9000/api/timer"


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
		this.callAPI = this.callAPI.bind(this)
		this.startTimer = this.startTimer.bind(this)
	}

	async startTimer(event: any) {
		event.preventDefault()
		let newMinutes = event.target.textContent
		let id = event.target.id
		let data = {
			id: id,
			minutes: newMinutes,
		}
		let res = await fetch(backendURL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data),
		})
		console.log(res)
		this.callAPI()
	}

	// Calling the API. Top-level method.
	callAPI() {
		fetch(backendURL)
			.then(response => response.json())
			.then(response => {
				const data = response.data
				console.log("apicall")
				let timerData = data[0]
				console.log(timerData)
				this.setState({
					timerStatus: timerData
				})
			})
	}

	componentDidMount() {
		this.callAPI()
	}

	render() {
		function numDigits(x: number) {
			return Math.max(Math.floor(Math.log10(Math.abs(x))), 0) + 1;
		}
		let status = this.state.timerStatus
		let minutes
		let seconds
		numDigits(status.minutes) <= 1 ? minutes = `0${status.minutes}` : minutes = status.minutes
		numDigits(status.seconds) <= 1 ? seconds = `0${status.seconds}` : seconds = status.seconds
		return (
			<div>
				<Timer
					timerOptions={status.timerOptions}
					id={status.id}
					startTimer={this.startTimer}
				/>
				<h1>{`${minutes}:${seconds}`}</h1>
			</div>
		)
	}
}

export default App