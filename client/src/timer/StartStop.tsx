import React from "react"

function StartStop(props) {
	return (
		<div>
			<form
				id={props.id}
				onSubmit={props.toggleRunning}
			>
				<button>Start/Stop</button>
			</form>
		</div>
	)
}

export default StartStop