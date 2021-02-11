import React from "react"
import Participant from "./Participant"

function ParticipantsList(props: {
	users: {
		id: number,
		name: string,
		totalPomsToday: number,
		isOnline: boolean
	}[]
}) {
	let users: Array<any> = []
	props.users.forEach(user => {
		if (user.isOnline === true) {
			return (
				users.push(
					<Participant
						username={user.name}
					/>
				)
			)
		}
	})
	return (
		<div>
			<h1>Participants</h1>
			{users}
		</div>
	)
}

export default ParticipantsList