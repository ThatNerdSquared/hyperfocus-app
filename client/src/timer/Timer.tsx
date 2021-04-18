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
	handleDeleteOption: Function,
	isRunning: boolean
}) {
	let optionComponents: Array<any> = []
	props.timerOptions.forEach(option => {
		if (option === null) {
			return
		}
		else {
			optionComponents.push(
				<TimerOption 
					startTimer={props.startTimer}
					id={props.id}
					time={option}
					handleDeleteOption={props.handleDeleteOption}
				/>
			)
		}
	})
	return (
		<div className="app">
			<StartStop
				id={props.id}
				toggleRunning={props.toggleRunning}
				isRunning={props.isRunning}
			/>
			<div className="options">{optionComponents}</div>
			<AddCustomOption
				newOption={props.newOption}
				formChange={props.formChange}
				handleAddOption={props.handleAddOption}
			/>
		</div>
	)
}

export default Timer