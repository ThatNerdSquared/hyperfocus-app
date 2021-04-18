import React from "react"
import Timer from "./timer/Timer"
import io from "socket.io-client"
import LoginScreen from "./LoginScreen"
import NewRoomModal from "./NewRoomModal"
import ParticipantsList from "./participants/ParticipantsList"
import Banner from "./assets/hyperfocus-banner.svg"
import Favicon from "./assets/hyperfocus-favicon.png"
import { setupBeforeUnloadListener } from "./AutoLogoutUtils"

// Uncomment the below for dev.
let socket: any
if (process.env.NODE_ENV === 'development') {
	socket = io("http://192.168.228.111:9000")
}
else {
	socket = io()
}


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
	loginCode: string
	loginNameValid: boolean,
	loginCodeValid: boolean,
	newRoomModalShown: boolean,
	currentUser: {
		id: number,
		name: string,
		totalPomsToday: number,
		isOnline: boolean
	}
}

function numDigits(x: number) {
	return Math.max(Math.floor(Math.log10(Math.abs(x))), 0) + 1;
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
			loginCode: "",
			loginNameValid: true,
			loginCodeValid: true,
			newRoomModalShown: false,
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
		this.toggleRoomModal = this.toggleRoomModal.bind(this)
		this.handleAddOption = this.handleAddOption.bind(this)
		this.logMeIn = this.logMeIn.bind(this)
		this.logMeOut = this.logMeOut.bind(this)
	}
	
	formChange(event: any) {
		const name = event.target.name
		const value = event.target.value
		this.setState({ [name]: value })
	}

	async toggleRoomModal() {
		let newToggle = !this.state.newRoomModalShown
		await this.setState({ newRoomModalShown: newToggle })
		console.log(this.state.newRoomModalShown)
	}

	async startTimer(event: any) {
		event.preventDefault()
		let newMinutes = event.target.name
		let id = event.target.id
		let pom = this.state.timerStatus.pom
		let data = {
			id: id,
			minutes: newMinutes,
			pom: pom
		}
		socket.emit("startTimer", data)
	}

	logMeOut() {
		socket.emit("logMeOut", this.state.currentUser)
	}
	
	async logMeIn(event: any) {
		event.preventDefault()
		if (this.state.loginName === "") {
			await this.setState({
				loginNameValid: false
			})
		}
		else {
			await this.setState({
				loginNameValid: true
			})
		}
		if (this.state.loginCode === "") {
			await this.setState({
				loginCodeValid: false
			})
		}
		else {
			await this.setState({
				loginCodeValid: true
			})
		}

		if (this.state.loginNameValid && this.state.loginCodeValid){
			socket.emit("join", this.state.loginName)
			setupBeforeUnloadListener(this.logMeOut)
	
			socket.on("connectionData", this.handleNewStatus)
			socket.on("timerStarted", this.handleNewStatus)
			socket.on("timerToggled", this.handleNewStatus)
			socket.on("timerGoTickTock", this.handleNewStatus)
			socket.on("optionAdded", this.handleNewStatus)
			socket.on("optionDeleted", this.handleNewStatus)
			socket.on("userLoggedOut", this.handleNewStatus)
			socket.on("private", this.handleNewStatus)
		}
	}

	componentDidMount() {
		this.setState({
			isLoggedIn: false,
		})
		if (!("Notification" in window)) {
			console.log("This browser does not support desktop notification");
		}
		else {
			console.log("Notifications are supported");
			Notification.requestPermission();
		}
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
			if (!("Notification" in window)) {
				alert("Your work session has finished!")
			}
			else {
				let options = {
					body: "Your timer has finished!",
					icon: Favicon,
				};
				new Notification("Hyperfocus", options)
			}
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
		console.log(newOption)
		if (isNaN(newOption)) {
			return
		}
		else {
			let data = {
				id: id,
				option: newOption
			}
			socket.emit("addOption", data)
			this.setState({
				newOption: ""
			})
		}
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

	toggleRunning(event: any) {
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
			let status = this.state.timerStatus
			let minutes
			let seconds
			// let statusText
			let pomText
			numDigits(status.minutes) <= 1 ? minutes = `0${status.minutes}` : minutes = status.minutes
			numDigits(status.seconds) <= 1 ? seconds = `0${status.seconds}` : seconds = status.seconds
			// this.state.timerStatus.isRunning === true ? statusText = "In Progress" : statusText = "Paused"
			this.state.timerStatus.pom === true ? pomText = "Work Session" : pomText = "Break Time"
			return (
				<div className="app">
					<div className="header">
						<img src={Banner} width="600" height="100" alt="Hyperfocus app logo"/>
						<h1>{pomText}</h1>
					</div>
					<div className="header">
						<h1>{`${minutes}:${seconds}`}</h1>
					</div>
					<div className="panes">
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
								isRunning={this.state.timerStatus.isRunning}
							/>
						</div>
						<div>
							<ParticipantsList
								users={this.state.users}
							/>
						</div>
					</div>
				</div>
			)
		}
		else {
			return (
				<div>
					<LoginScreen
						logMeIn={this.logMeIn}
						formChange={this.formChange}
						toggleRoomModal={this.toggleRoomModal}
						loginName={this.state.loginName}
						loginNameValid={this.state.loginNameValid}
						loginCodeValid={this.state.loginCodeValid}
					/>
					{ this.state.newRoomModalShown ?
						(<NewRoomModal
							toggleRoomModal={this.toggleRoomModal}
						/>) : null
					}
				</div>
			)
		}
	}
}

export default App
