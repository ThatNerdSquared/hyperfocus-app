import React from "react"
import TimerOption from "./TimerOption"

function Timer(props: { timerOptions: Array<number>, startTimer: Function }) {
	const optionComponents = props.timerOptions.map(option => <TimerOption 
		startTimer={props.startTimer}
		time={option}
	/>)
	return (
		<div>
			{optionComponents}
		</div>
	)
}

export default Timer