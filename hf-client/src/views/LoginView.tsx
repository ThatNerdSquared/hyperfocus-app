import { SyntheticEvent, useState } from "react"
import Banner from "../assets/hyperfocus-banner.svg"
import { ValidationMsg } from "../validationMsgs"
import ValidationMsgs from "../components/ValidationMsgs"
import NewRoomModal from "../NewRoomModal"
import LoginForm from "../components/LoginForm"
import { buildAPIUrl } from "../config"
import { ErrorResponseBody } from "../App"

interface LoginViewProps {
    loginHandler: (username: string, loginCode: string) => void
}

function LoginView(props: LoginViewProps) {
    const [newRoomModalShown, setNewRoomModalShown] = useState<boolean>(false)
    const [formInputErrors, setFormInputErrors] = useState<ValidationMsg[]>([])

    const toggleRoomModal = () => {
        setNewRoomModalShown(!newRoomModalShown)
    }

    const createNewRoom = async (roomName: string) => {
        const res = await fetch(buildAPIUrl("rooms"), {
            method: "POST",
            body: JSON.stringify({ roomName: roomName }),
        })
        console.log(res)
        if (!res.ok) {
            const data: ErrorResponseBody = await res.json()
            return data.error == "ROOM_ALREADY_EXISTS"
                ? setFormInputErrors([
                    ...formInputErrors,
                    ValidationMsg.RoomAlreadyExists,
                ])
                : console.log(res.statusText)
        }
        setFormInputErrors([ValidationMsg.RoomCreated])
    }

    const handleLogin = (
        event: SyntheticEvent,
        username: string,
        loginCode: string,
    ) => {
        event.preventDefault()
        const inputErrors = []
        if (username === "") {
            inputErrors.push(ValidationMsg.NoUserNameProvided)
        }
        if (loginCode === "") {
            inputErrors.push(ValidationMsg.NoLoginCodeProvided)
        }
        return inputErrors.length !== 0
            ? setFormInputErrors(inputErrors)
            : props.loginHandler(username, loginCode)
    }

    return (
        <>
            {newRoomModalShown ? (
                <NewRoomModal
                    toggleRoomModal={toggleRoomModal}
                    newRoomHandler={createNewRoom}
                />
            ) : null}
            <div className="login">
                <img
                    src={Banner}
                    className="login-text"
                    width="600"
                    height="100"
                    alt="Hyperfocus app logo"
                />
                <h1 className="login-text">Welcome to Hyperfocus!</h1>
                <h1 className="login-text">
                    What's your name, and what room are you joining?
                </h1>
                <LoginForm
                    handleLogin={handleLogin}
                    toggleRoomModal={toggleRoomModal}
                />
                <ValidationMsgs errs={formInputErrors} />
                <p className="login-text">
                    This is only used to show other participants who you are.
                </p>
                <p className="login-text">
                    Support Hyperfocus by{" "}
                    <a
                        href="https://www.buymeacoffee.com/nathanyeung"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        buying me a coffee!
                    </a>
                </p>
                <p className="login-text">
                    Find Hyperfocus on{" "}
                    <a
                        href="https://github.com/ThatNerdSquared/hyperfocus-app"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </a>
                </p>
            </div>
        </>
    )
}

export default LoginView
