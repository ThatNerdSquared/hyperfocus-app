import { SyntheticEvent, useState } from "react"
import { ValidationMsg } from "./validationMsgs"
import ValidationMsgs from "./components/ValidationMsgs"

interface NewRoomModalProps {
    newRoomHandler: () => void
    toggleRoomModal: () => void
}

function NewRoomModal(props: NewRoomModalProps) {
    const [newRoomCode, setNewRoomCode] = useState<string>("")
    const [formInputErrors, setFormInputErrors] = useState<ValidationMsg[]>([])

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault()
        if (newRoomCode === "") {
            return setFormInputErrors([ValidationMsg.NoLoginCodeProvided])
        }
        props.toggleRoomModal()
        return props.newRoomHandler()
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <h1 className="login-text">Create a Room</h1>
                <form className="modal-form">
                    <input
                        type="text"
                        value={newRoomCode}
                        name="newRoomCode"
                        placeholder="New code (i. e. epicroom)"
                        onChange={(event) => setNewRoomCode(event.target.value)}
                        className="login-input"
                    />
                    <button className="login-button" onClick={handleSubmit}>
                        Create!
                    </button>
                    <ValidationMsgs errs={formInputErrors} />
                </form>
            </div>
            <button className="close-button" onClick={props.toggleRoomModal}>
                &times;
            </button>
        </div>
    )
}

export default NewRoomModal
