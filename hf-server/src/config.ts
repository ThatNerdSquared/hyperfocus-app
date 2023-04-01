import "dotenv/config"
import { Config } from "./types"

const csvToArray = (envVar: string) => {
    return envVar ? envVar.split(",").map((x) => x.trim()) : []
}

export const CONF: Config = {
    port: Number(process.env.PORT as string),
    allowedCorsDomains: csvToArray(process.env.ALLOWED_CORS_DOMAINS as string),
    dbUserName: process.env.DB_USERNAME as string,
    dbPassword: process.env.DB_PASSWORD as string,
    dbDomain: process.env.DB_DOMAIN as string,
    dbName: process.env.DB_NAME as string
}