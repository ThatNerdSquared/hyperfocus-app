import { SyntheticEvent, useState } from "react"
import Banner from "../assets/hyperfocus-banner.svg"
import { ValidationMsg } from "../validationMsgs"
import ValidationMsgs from "../components/ValidationMsgs"
import NewRoomModal from "../NewRoomModal"
import LoginForm from "../components/LoginForm"

interface LoginViewProps {
    loginHandler: () => void
}

function LoginView(props: LoginViewProps) {
    const [newRoomModalShown, setNewRoomModalShown] = useState<boolean>(false)
    const [formInputErrors, setFormInputErrors] = useState<ValidationMsg[]>([])

    const toggleRoomModal = () => {
        setNewRoomModalShown(!newRoomModalShown)
    }

    const createNewRoom = () => {
        // TODO: connect createNewRoom to server
        console.log("create new room")
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
            : props.loginHandler()
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
