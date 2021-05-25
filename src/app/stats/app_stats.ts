export interface AppStats {
    app: string
    env: string
    date: string
    logPath: string
    stats: {
        totalRequests: number
        users: Map<string, Map<string, number>>
    }
}