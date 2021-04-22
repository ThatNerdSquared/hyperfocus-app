import React from "react"
import Participant from "./Participant"

function ParticipantsList(props: { participants: Array<string> }) {
	let activeParticipants: Array<any> = []
	props.participants.forEach(participant => {
		activeParticipants.push(
			<Participant
				username={participant}
			/>
		)
	})
	return (
		<div>
			<h1 className="header2">Participants</h1>
			{activeParticipants}
		</div>
	)
}

export default ParticipantsList