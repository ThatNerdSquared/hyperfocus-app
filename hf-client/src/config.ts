const API_URL = import.meta.env.PROD
    ? "https://hyperfocus.nathanyeung.ca/api"
    : "http://localhost:9000/api"

const API_VERSION: number = 1

export const buildAPIUrl = (route: string) => {
    return `${API_URL}/v${API_VERSION}/${route}`
}

