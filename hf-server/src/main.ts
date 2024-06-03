import express, { Request, Response } from "express";
import { join }from "path";

const BUILD_FOLDER = 'build'
const ROOT_PAGE = join(BUILD_FOLDER, 'index.html')

const server = express()
server.listen(9000);

server.use(express.json());
server.use(express.static('build'));

server.get('/', (_, res: Response) => {
    res.sendFile(ROOT_PAGE)
})

interface LoginReqBody {
    username: string
}

server.get('/api/login', (req: Request<{}, {}, LoginReqBody>, res: Response) => {
    console.log(`Logging in user ${req.body.username}!`)
})
