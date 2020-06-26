export interface Application {
    application: string;
    env: string;
    hosts: [
        {
            paths: string[];
            endpoint: string;
            health: string;
        }
    ];
}