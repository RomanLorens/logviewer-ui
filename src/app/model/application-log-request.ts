import { LogStructure } from './log-structure';

export interface ApplicationLogRequest {
    log: string;
    from?: number;
    size?: number;
    endpoint: string
    logStructure?: LogStructure
}