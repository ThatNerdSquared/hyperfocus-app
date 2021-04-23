import React from "react"
import Participant from "./Participant"

function ParticipantsList(props: { participants: Array<string> }) {
	let activeParticipants: Array<any> = []
	props.participants.forEach(participant => {
		let newParticipant = participant
		if (participant.length >= 25) {
			newParticipant = participant.slice(0, 24) + "..."
		}
		activeParticipants.push(
			<Participant
				username={newParticipant}
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