import React from "react"

function AddCustomOption(props: any) {
	return (
		<div>
			<form
				onSubmit={props.handleAddOption}
				className="addOption-form"
			>
				<input
					type="text"
					value={props.newOption}
					name="newOption"
					placeholder="Add another option... "
					onChange={props.formChange}
					className="addOption-input"
				/>
				<button className="addOption-button">Add</button>
			</form>
		</div>
	)
}

export default AddCustomOption 