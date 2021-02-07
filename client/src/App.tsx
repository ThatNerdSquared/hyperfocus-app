import React from "react"
import Timer from "./timer/Timer"

// const backendURL = "http://192.168.228.111:9000/api/timer"
const backendURL = "http://localhost:9000/api/timer"


type myState = {
	timerStatus: {
		minutes: number,
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
				minutes: 10101,
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
		console.log(event)
		let data = {
			minutes: newMinutes
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
		return (
			<div>
				<Timer
					timerOptions={this.state.timerStatus.timerOptions}
					startTimer={this.startTimer}
				/>
				<h1>{this.state.timerStatus.minutes}</h1>
			</div>
		)
	}
}

export default App