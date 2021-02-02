import React from "react"
import TimerOption from "./TimerOption"

function Timer(props: { timerOptions: Array<number> }) {
	const optionComponents = props.timerOptions.map(option => <TimerOption 
		chooseOption={props.chooseOption}
		time={option}
	/>)
	return (
		<div>
			{optionComponents}
		</div>
	)
}

export default Timer