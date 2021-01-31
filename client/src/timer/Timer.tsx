import React from "react"
import Options from "./Options"

function Timer(props: { timerOptions: Array<number> }) {
	const optionsProps = {
		timerOptions: props.timerOptions
	}
	return (
		<div>
			<Options {...optionsProps} />
		</div>
	)
}

export default Timer