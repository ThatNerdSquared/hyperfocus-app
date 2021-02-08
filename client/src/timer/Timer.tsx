import React from "react"
import StartStop from "./StartStop"
import TimerOption from "./TimerOption"

function Timer(props: { timerOptions: Array<number>, startTimer: Function, id: number }) {
	const optionComponents = props.timerOptions.map(option => <TimerOption 
		startTimer={props.startTimer}
		id={props.id}
		time={option}
	/>)
	return (
		<div>
			{optionComponents}
			<StartStop
				id={props.id}
				toggleRunning={props.toggleRunning}
			/>
		</div>
	)
}

export default Timer