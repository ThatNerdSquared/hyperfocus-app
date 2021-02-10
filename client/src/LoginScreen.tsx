import React from "react"

function LoginScreen(props: any) {
	return (
		<div className="login">
			<h1 className="login-text">Welcome to Hyperfocus!</h1>
			<h1 className="login-text">What's your name?</h1>
			<form className="login-form" onSubmit={props.logMeIn}>
				<input
					type="text"
					value={props.loginName}
					name="loginName"
					placeholder="i.e. ThatNerd"
					onChange={props.formChange}
					className="login-input"
				/>
				<button className="login-input">Login/Join</button>
			</form>
			<p className="login-text">This is only used to show other participants who you are.</p>
			<p className="login-text">More advanced room features and login options coming soon!</p>
		</div>
	)
}

export default LoginScreen