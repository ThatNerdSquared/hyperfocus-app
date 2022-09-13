import React from "react"

function NewRoomModal(props: any) {
	return (
		<div className="modal">
			<div className="modal-content">
				<h1 className="login-text">Create a Room</h1>
				<form className="modal-form">
					<input
						type="text"
						value={props.newRoomCode}
						name="newRoomCode"
						placeholder="New code (i. e. epicroom)"
						onChange={props.formChange}
						className="login-input"
					/>
					<button className="login-button" onClick={props.newRoom}>Create!</button>
					{
						props.roomCodeValid ? null: (<p className="warning-text">Please enter a room code!</p>)
					}
				</form>
			</div>
			<button className="close-button" onClick={props.toggleRoomModal}>&times;</button>
		</div>
	)
}

export default NewRoomModal