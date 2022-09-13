import React from "react"

function StartStop(props: any) {
	let buttonText
	props.isRunning === true ? buttonText = "Pause" : buttonText = "Resume"
	return (
		<div className="startstop">
			<form
				id={props.id}
				onSubmit={props.toggleRunning}
			>
				<button className="startstop-button">{buttonText}</button>
			</form>
		</div>
	)
}

export default StartStop