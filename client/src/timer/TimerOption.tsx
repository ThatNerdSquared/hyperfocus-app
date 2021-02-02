import React from "react"

function TimerOption(props) {
	return (
		<div>
			<form
				minutes={props.time}
				onSubmit={props.chooseOption}
			>
				<button>{props.time}</button>
			</form>
		</div>
	)
}

export default TimerOption