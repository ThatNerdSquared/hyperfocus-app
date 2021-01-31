import React from "react"
import TimerOption from "./TimerOption"

function Options(props: { timerOptions: Array<number> }) {
	const components = props.timerOptions.map(option => <TimerOption
		key={option}
		time={option}
	/>)
	return (
		<div>
			{components}
		</div>
	)
}

export default Options