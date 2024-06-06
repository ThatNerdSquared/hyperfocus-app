CREATE TABLE rooms (
    id uuid DEFAULT gen_random_uuid(),
    creationDate timestamp DEFAULT current_timestamp(),
    name text NOT NULL,
    presets integer[]
);

CREATE TABLE accounts (
    id uuid DEFAULT gen_random_uuid(),
    creationDate timestamp DEFAULT current_timestamp(),
    username text NOT NULL,
    currentRoom integer[]
);
