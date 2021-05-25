import { EndpointHost } from './endpoint-host';

export interface AppHost extends EndpointHost {
    appHost: string
}

export function asEndpoint(host: AppHost): EndpointHost {
    return {
        endpoint: host.endpoint,
        paths: host.paths
    } as EndpointHost
}
