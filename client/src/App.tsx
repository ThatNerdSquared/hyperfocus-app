import React from "react"
import Timer from "./timer/Timer"

type myState = {
	timerOptions: Array<number>
}
class App extends React.Component<unknown, myState> {
	constructor(props: unknown) {
		super(props)
		this.state = {
			timerOptions: []
		}
	}
	render() {
		return (
			<Timer
				timerOptions={this.state.timerOptions}
			/>
		)
	}
}

export default App