import React from "react"
import Timer from "./timer/Timer"
import io from "socket.io-client"
import LoginScreen from "./LoginScreen"
import ParticipantsList from "./participants/ParticipantsList"

// const backendURL = "http://192.168.228.111:9000/api/"
// const backendURL = "http://localhost:9000/"
const backendURL = "http://192.168.228.111:9000"
const socket = io(backendURL)


type myState = {
	timerStatus: {
		id: number,
		minutes: number,
		seconds: number,
		pom: boolean,
		isRunning: boolean,
		isIntervalSet: boolean,
		timerOptions: Array<number>,
		participants: Array<string>,
	},
	users: {
		id: number,
		name: string,
		totalPomsToday: number,
		isOnline: boolean
	}[],
	isLoggedIn: boolean,
	newOption: string,
	loginName: string
	currentUser: {
		id: number,
		name: string,
		totalPomsToday: number,
		isOnline: boolean
	}
}

class App extends React.Component<unknown, myState> {
	constructor(props: unknown) {
		super(props)
		this.state = {
			timerStatus: {
				id: 27,
				minutes: 10101,
				seconds: 42,
				pom: false,
				isRunning: false,
				isIntervalSet: false,
				timerOptions: [],
				participants: [],
			},
			users: [],
			isLoggedIn: false,
			newOption: "",
			loginName: "",
			currentUser: {
				name: "Guest",
				totalPomsToday: 0,
				isOnline: true
			}
		}
		this.startTimer = this.startTimer.bind(this)
		this.toggleRunning = this.toggleRunning.bind(this)
		this.handleNewStatus = this.handleNewStatus.bind(this)
		this.formChange = this.formChange.bind(this)
		this.handleAddOption = this.handleAddOption.bind(this)
		this.logMeIn = this.logMeIn.bind(this)
		this.logMeOut = this.logMeOut.bind(this)
		this.setupBeforeUnloadListener = this.setupBeforeUnloadListener.bind(this)
	}
	
	formChange(event: any) {
		const name = event.target.name
		const value = event.target.value
		this.setState({ [name]: value })
	}

	async startTimer(event: any) {
		event.preventDefault()
		let newMinutes = event.target.textContent
		let id = event.target.id
		let data = {
			id: id,
			minutes: newMinutes,
		}
		socket.emit("startTimer", data)
		socket.emit("beginTickTock", id)
	}

	// Setup the `beforeunload` event listener
	setupBeforeUnloadListener() {
		window.addEventListener("beforeunload", (event) => {
			event.preventDefault();
			return this.logMeOut()
		});
	};

	componentDidMount() {
		this.setState({
			isLoggedIn: false
		})
	}
	
	logMeIn(event: any) {
		event.preventDefault()
		socket.emit("join", this.state.loginName)
		this.setupBeforeUnloadListener()
		socket.on("connectionData", this.handleNewStatus)
		socket.on("timerStarted", this.handleNewStatus)
		socket.on("timerToggled", this.handleNewStatus)
		socket.on("timerGoTickTock", this.handleNewStatus)
		socket.on("optionAdded", this.handleNewStatus)
		socket.on("optionDeleted", this.handleNewStatus)
		socket.on("userLoggedOut", this.handleNewStatus)
		socket.on("private", this.handleNewStatus)
		if (!("Notification" in window)) {
			console.log("This browser does not support desktop notification");
		}
		else {
			console.log("Notifications are supported");
		}
	}

	logMeOut() {
		socket.emit("logMeOut", this.state.currentUser)
	}

	handleNewStatus(data: any) {
		if (data.timerStatus != null) {
			let dataArray = data.timerStatus
			let newStatus = dataArray[0]
			this.setState({
				timerStatus: newStatus
			})
		}
		if (data.pomDone === true) {
			alert("Your work session has finished!")
			// new Notification("Your work session is complete!")
		}
		if (data.users != null) {
			let users = data.users
			this.setState({
				users: users
			})
		}
		if (data.currentUser != null) {
			let currentUser = data.currentUser
			this.setState({
				currentUser: currentUser
			})
		}
		if (data.isLoggedIn === true) {
			this.setState({
				isLoggedIn: true
			})
		}
	}

	handleAddOption(event: any) {
		event.preventDefault()
		let id = this.state.timerStatus.id
		let option = this.state.newOption
		let newOption = parseInt(option)
		let data = {
			id: id,
			option: newOption
		}
		socket.emit("addOption", data)
		this.setState({
			newOption: ""
		})
	}

	handleDeleteOption(event: any) {
		event.preventDefault()
		console.log(event)
		let id = event.target.id
		let option = event.target.name
		let data = {
			id: id,
			option: option
		}
		socket.emit("deleteOption", data)
	}

	async toggleRunning(event: any) {
		event.preventDefault()
		let newRunning
		this.state.timerStatus.isRunning === true ? newRunning = false : newRunning = true
		let id = event.target.id
		let data = {
			id: id,
			isRunning: newRunning,
		}
		socket.emit("toggleTimer", data)
	}

	render() {
		if (this.state.isLoggedIn) {
			function numDigits(x: number) {
				return Math.max(Math.floor(Math.log10(Math.abs(x))), 0) + 1;
			}
			let status = this.state.timerStatus
			let minutes
			let seconds
			let statusText
			numDigits(status.minutes) <= 1 ? minutes = `0${status.minutes}` : minutes = status.minutes
			numDigits(status.seconds) <= 1 ? seconds = `0${status.seconds}` : seconds = status.seconds
			this.state.timerStatus.isRunning === true ? statusText = "true" : statusText = "false"
			return (
				<div>
					<Timer
						timerOptions={status.timerOptions}
						id={status.id}
						startTimer={this.startTimer}
						toggleRunning={this.toggleRunning}
						formChange={this.formChange}
						newOption={this.state.newOption}
						handleAddOption={this.handleAddOption}
						handleDeleteOption={this.handleDeleteOption}
					/>
					<h1>{`${minutes}:${seconds}`}</h1>
					<p>Status: {statusText}</p>
					<ParticipantsList
						users={this.state.users}
					/>
				</div>
			)
		}
		else {
			return (
				<div>
					<LoginScreen
						logMeIn={this.logMeIn}
						formChange={this.formChange}
						loginName={this.state.loginName}
					/>
				</div>
			)
		}
	}
}

export default App