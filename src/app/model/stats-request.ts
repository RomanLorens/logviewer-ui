import { LogRequest } from './log-request';
import { ApplicationLogRequest } from './application-log-request';
import { LogStructure, } from './log-structure';

export interface StatsRequest extends LogRequest {
    logStructure: LogStructure
    from?: number
    size?: number
}