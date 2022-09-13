import React from "react"

function Participant(props: any) {
	return (
		<div className="participants">
			<p>{props.username}</p>
		</div>
	)
}

export default Participant