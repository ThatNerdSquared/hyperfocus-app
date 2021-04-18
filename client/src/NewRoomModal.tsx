import React from "react"

function NewRoomModal(props: any) {
	return (
		<div className="login">
			<div className="modal">
				<button className="close-button" onClick={props.toggleRoomModal}>&times;</button>
				<div className="modal-content">
					<h1 className="login-text">Create a Room</h1>
					<button className="login-button" onClick={props.toggleRoomModal}>Create!</button>
				</div>
			</div>
		</div>
	)
}

export default NewRoomModal