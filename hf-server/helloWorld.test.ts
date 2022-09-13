import { helloWorld } from "./src/helloWorld"

test("Hello world says hi", () => {
    const res = helloWorld(false)
    expect(res).toBe("No greetings here :(")
    const res2 = helloWorld(true)
    expect(res2).toBe("Hello, world! This is the Hyperfocus server!")
})