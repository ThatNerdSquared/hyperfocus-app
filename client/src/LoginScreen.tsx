import React from "react"
import Banner from "./assets/hyperfocus-banner.svg"

function LoginScreen(props: any) {
	return (
		<div className="login">
			<img src={Banner} className="login-text" width="600" height="100" alt="Hyperfocus app logo"/>
			<h1 className="login-text">Welcome to Hyperfocus!</h1>
			<h1 className="login-text">What's your name, and what room are you joining?</h1>
			<form className="login-form" onSubmit={props.logMeIn}>
				<input
					type="text"
					value={props.loginName}
					name="loginName"
					placeholder="i.e. ThatNerd"
					onChange={props.formChange}
					className="login-input"
				/>
				<input
					type="text"
					value={props.loginCode}
					name="loginCode"
					placeholder="i.e. 123456"
					onChange={props.formChange}
					className="login-input"
				/>
				<button className="login-button">Login/Join</button>
			</form>
			{
				props.loginNameValid ? null: (<p className="warning-text">Please enter a username!</p>)
			}
			{
				props.loginCodeValid ? null : (<p className="warning-text">Please enter a room code!</p>)
			}
			<button
				className="login-button"
				onClick={props.toggleRoomModal}
			>
				Create Room
			</button>
			{
				props.roomAlreadyExists ? (<p className="warning-text">This room already exists!</p>) : null
			}
			{
				props.roomCreated ? (<p className="happy-text">Your room was created!</p>) : null
			}
			<p className="login-text">This is only used to show other participants who you are.</p>
			<p className="login-text">More advanced room features and login options coming soon!</p>
		</div>
	)
}

export default LoginScreen