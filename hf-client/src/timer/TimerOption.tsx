import React from "react"

function TimerOption(props: any) {
	return (
		<div className="single-option">
			<form
				name={props.time}
				id={props.id}
				onSubmit={props.startTimer}
			>
				<button className="option-button">{props.time}</button>
			</form>
			<form
				name={props.time}
				id={props.id}
				onSubmit={props.handleDeleteOption}
			>
				<button className="option-delete">Delete</button>
			</form>
		</div>
	)
}

export default TimerOption