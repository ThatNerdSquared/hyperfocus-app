import { MsgStyle, ValidationMsg, errorCopy } from "../validationMsgs"

interface ValidationMsgsProps {
    errs: ValidationMsg[]
}

const ValidationMsgs = (props: ValidationMsgsProps) => {
    return props.errs.map((inputError) => {
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
    })
}

export default ValidationMsgs
