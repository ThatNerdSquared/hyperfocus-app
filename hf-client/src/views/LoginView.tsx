import { SyntheticEvent, useState } from "react"
import Banner from "./assets/hyperfocus-banner.svg"
import { MsgStyle, ValidationMsg, errorCopy } from "./validationMsgs"

interface LoginViewProps {
    loginHandler: () => void
    toggleRoomModal: () => void
}

function LoginView(props: LoginViewProps) {
    const [username, setUsername] = useState<string>("")
    const [loginCode, setLoginCode] = useState<string>("")
    const [formInputErrors, setFormInputErrors] = useState<ValidationMsg[]>([])

    const handleLogIn = (event: SyntheticEvent) => {
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
            <form className="login-form" onSubmit={handleLogIn}>
                <input
                    type="text"
                    value={username}
                    name="loginName"
                    placeholder="i.e. ThatNerd"
                    onChange={(event) => setUsername(event.target.value)}
                    className="login-input"
                />
                <input
                    type="text"
                    value={loginCode}
                    name="loginCode"
                    placeholder="i.e. 123456"
                    onChange={(event) => setLoginCode(event.target.value)}
                    className="login-input"
                />
                <button className="login-button">Login/Join</button>
            </form>
            <button className="login-button" onClick={props.toggleRoomModal}>
                Create Room
            </button>
            {formInputErrors.map((inputError) => {
                const copy = errorCopy[inputError]
                return (
                    <p
                        className={
                            copy.style === MsgStyle.Failure
                                ? "warning-text"
                                : "happy-text"
                        }
                    >
                        {copy.msg}
                    </p>
                )
            })}
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
    )
}

export default LoginView
