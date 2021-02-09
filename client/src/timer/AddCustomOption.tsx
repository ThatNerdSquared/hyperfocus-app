import React from "react"

function AddCustomOption(props) {
	return (
		<div>
			<form onSubmit={props.handleAddOption}>
				<input
					type="text"
					value={props.newOption}
					name="newOption"
					placeholder="Add another option... "
					onChange={props.formChange}
				/>
				<button>Add</button>
			</form>
		</div>
	)
}

export default AddCustomOption 