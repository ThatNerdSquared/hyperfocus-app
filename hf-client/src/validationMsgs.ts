interface ValidationMsgData {
    style: MsgStyle
    msg: string
}

enum ValidationMsg {
    NoUserNameProvided,
    NoLoginCodeProvided,
    RoomAlreadyExists,
    RoomDoesNotExist,
    RoomCreated,
}

enum MsgStyle {
    Success,
    Failure,
}

const errorCopy: Record<ValidationMsg, ValidationMsgData> = {
    [ValidationMsg.NoUserNameProvided]: {
        style: MsgStyle.Failure,
        msg: "Please enter a username!",
    },
    [ValidationMsg.NoLoginCodeProvided]: {
        style: MsgStyle.Failure,
        msg: "Please enter a room code!",
    },
    [ValidationMsg.RoomDoesNotExist]: {
        style: MsgStyle.Failure,
        msg: "This room does not exist!",
    },
    [ValidationMsg.RoomAlreadyExists]: {
        style: MsgStyle.Failure,
        msg: "This room already exists!",
    },
    [ValidationMsg.RoomCreated]: {
        style: MsgStyle.Success,
        msg: "Your room was created!",
    },
}

export { ValidationMsg, MsgStyle, errorCopy }
