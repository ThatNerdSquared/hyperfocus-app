import { useState } from "react"
import Banner from "../assets/hyperfocus-banner.svg"
import Timer from "../timer/Timer"
import ParticipantsList from "../participants/ParticipantsList"

interface TimerData {
    id: number
    roomCode: string
    secondsLeft: number
    isPom: boolean
    isRunning: boolean
    presets: Array<number>
    participants: Array<string>
}

const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0")
    const secs = String(Math.floor(seconds % 60)).padStart(2, "0")
    return `${hours === 0 ? "" : hours + ":"}${mins}:${secs}`
}

function TimerView(): JSX.Element {
    const temp: TimerData = {
        id: 0,
        roomCode: "hearthands",
        secondsLeft: 42,
        isPom: true,
        isRunning: true,
        presets: [5, 25, 50, 90],
        participants: ["whee"],
    }
    const [timerData, setTimerData] = useState<TimerData>(temp)

    return (
        <div className="app">
            <div className="header">
                <img
                    src={Banner}
                    width="600"
                    height="100"
                    alt="Hyperfocus app logo"
                />
                <h1>{timerData?.isPom ? "Work Session" : "Break Time"}</h1>
            </div>
            <div className="header">
                <h1>{formatTime(timerData.secondsLeft)}</h1>
            </div>
            <div className="panes">
                <div>
                    <Timer
                        timerOptions={timerData.presets}
                        id={timerData.id}
                        // TODO: connect startTimer to server
                        startTimer={() => console.log("startTimer")}
                        // TODO: connect toggleRunning to server
                        toggleRunning={() => console.log("toggleRunning")}
                        // TODO: connect handleAddOption to server
                        handleAddOption={() => console.log("handleAddOption")}
                        // TODO: connect handleDeleteOption to server
                        handleDeleteOption={() =>
                            console.log("handleDeleteOption")
                        }
                        isRunning={timerData.isRunning}
                    />
                </div>
                <div>
                    <ParticipantsList participants={timerData.participants} />
                </div>
            </div>
        </div>
    )
}

export default TimerView
