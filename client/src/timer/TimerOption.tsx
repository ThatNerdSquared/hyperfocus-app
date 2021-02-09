import React from "react"

function TimerOption(props: any) {
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