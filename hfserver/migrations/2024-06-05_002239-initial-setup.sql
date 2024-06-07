CREATE TABLE rooms (
    id uuid NOT NULL,
    creationDate timestamp NOT NULL,
    name text NOT NULL,
    presets integer[]
);

CREATE TABLE accounts (
    id uuid NOT NULL,
    creationDate timestamp NOT NULL,
    username text NOT NULL,
    currentRoom integer[]
);
