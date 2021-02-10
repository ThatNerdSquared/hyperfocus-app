import React from "react"

function LoginScreen(props: any) {
	return (
		<div>
			<h1>Welcome to Hyperfocus! What's your name?</h1>
			<form onSubmit={props.logMeIn}>
				<input
					type="text"
					value={props.loginName}
					name="loginName"
					placeholder="i.e. ThatNerd"
					onChange={props.formChange}
				/>
				<button>Login/Join</button>
			</form>
			<p>This is only used to show other participants who you are.</p>
			<p>More advanced room features and login options coming soon!</p>
		</div>
	)
}

export default LoginScreen