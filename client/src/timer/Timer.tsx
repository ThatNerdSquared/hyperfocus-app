import React from "react"
import StartStop from "./StartStop"
import TimerOption from "./TimerOption"
import AddCustomOption from "./AddCustomOption"

function Timer(props: {
	timerOptions: Array<number>,
	startTimer: Function,
	id: number,
	toggleRunning: Function,
	formChange: Function 
	newOption: string,
	handleAddOption: Function,
	handleDeleteOption: Function
}) {
	const optionComponents = props.timerOptions.map(option => <TimerOption 
		startTimer={props.startTimer}
		id={props.id}
		time={option}
		handleDeleteOption={props.handleDeleteOption}
	/>)
	return (
		<div>
			{optionComponents}
			<StartStop
				id={props.id}
				toggleRunning={props.toggleRunning}
			/>
			<AddCustomOption
				newOption={props.newOption}
				formChange={props.formChange}
				handleAddOption={props.handleAddOption}
			/>
		</div>
	)
}

export default Timer