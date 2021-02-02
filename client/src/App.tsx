import React from "react"
import Timer from "./timer/Timer"

type myState = {
	timerStatus: {
		minutes: number,
		pom: boolean,
		isRunning: boolean
	},
	timerOptions: Array<number>,
	participants: Array<string>,
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
				minutes: 420,
				pom: true,
				isRunning: false
			},
			timerOptions: [15, 25, 55, 90],
			participants: [],
			users: []
		}
		this.chooseOption = this.chooseOption.bind(this)
	}

	chooseOption(event: any) {
		event.preventDefault()
		let newMinutes = event.target.textContent
		this.setState({
			timerStatus: {
				minutes: newMinutes,
				pom: true,
				isRunning: true
			}
		})
	}

	render() {
		return (
			<div>
				<Timer
					timerOptions={this.state.timerOptions}
					chooseOption={this.chooseOption}
				/>
				<h1>{this.state.timerStatus.minutes}</h1>
			</div>
		)
	}
}

export default App