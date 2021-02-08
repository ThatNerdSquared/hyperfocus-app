import React from "react"

function TimerOption(props) {
	return (
		<div>
			<form
				minutes={props.time}
				id={props.id}
				onSubmit={props.startTimer}
			>
				<button>{props.time}</button>
			</form>
		</div>
	)
}

export default TimerOption