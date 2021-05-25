import { AppHost } from './app-host';

export interface SearchRequest {
    hosts: AppHost[]
    value: string
}