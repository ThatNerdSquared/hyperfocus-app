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
			<form
				name={props.time}
				id={props.id}
				onSubmit={props.handleDeleteOption}
			>
				<button>Delete</button>
			</form>
		</div>
	)
}

export default TimerOption