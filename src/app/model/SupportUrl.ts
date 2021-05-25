import { Header } from '../logs/header';

export interface SupportUrl {
    description: string
    method: string
    name: string
    url: string
    headers: {}
    _headers: Header[]
}