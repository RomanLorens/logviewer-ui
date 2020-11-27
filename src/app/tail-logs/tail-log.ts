import { SupportUrl } from '../logs/SupportUrl';

export class TailLog {
    application: string;
    env: string;
    host: string;
    log: string;
    from: number;
    size: number;
    supportUrls: SupportUrl[]
}