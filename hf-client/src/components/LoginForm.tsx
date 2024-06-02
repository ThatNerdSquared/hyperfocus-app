import { SyntheticEvent, useState } from "react"

interface LoginFormProps {
    handleLogin: (
        event: SyntheticEvent,
        username: string,
        loginCode: string,
    ) => void
    toggleRoomModal: () => void
}

function LoginForm(props: LoginFormProps) {
    const [username, setUsername] = useState<string>("")
    const [loginCode, setLoginCode] = useState<string>("")

    return (
        <>
            <form
                className="login-form"
                onSubmit={(event) =>
                    props.handleLogin(event, username, loginCode)
                }
            >
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
        </>
    )
}

export default LoginForm
