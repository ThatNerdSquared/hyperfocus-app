interface Config {
    port: number;
    allowedCorsDomains: Array<string>;
    dbUserName: string;
    dbPassword: string;
    dbDomain: string;
    dbName: string;
}

enum TimerStatus {
    Pom,
    Break
}

enum UserStatus {
    Online,
    Idling,
    Offline
}

interface Participant {
    id: string;
    username: string;
    totalPomsToday: number;
    status: UserStatus;
}

interface TimerOption {
    time: number;
    enabled: boolean;
}

interface Room {
    id: string;
    joinCode: string;
    timeLeft: number;
    status: TimerStatus;
    timerOptions: Array<TimerOption>;
    participants: Array<Participant>;
    joinedClients: Array<Client>;
}

interface Client {
    socket: string;
    joinedRoom: Room;
}

export { Config, Participant, Room }