import { SupportUrl } from './SupportUrl';
import { AppHost } from './app-host';
import { LogStructure } from './log-structure';

export interface Application {
    application: string;
    env: string;
    hosts: AppHost[]
    logStructure: LogStructure
    supportUrls?: SupportUrl[]
}