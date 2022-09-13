const helloWorld = (shouldSayHi: boolean) => {
    if (shouldSayHi) {
        return "Hello, world! This is the Hyperfocus server!"
    }
    else {
        return "No greetings here :("
    }
}

export { helloWorld }