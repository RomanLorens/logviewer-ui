import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Application } from '../logs/Application';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { ApplicationSearch } from '../logs/application-search';
import { environment } from '../../environments/environment';
import { SearchResult } from '../logs/search-result';
import { Log } from '../list-logs/log';
import { TailLog } from '../tail-logs/tail-log';
import { TailLogsComponent } from '../tail-logs/tail-logs.component';
import { SupportUrl } from '../logs/SupportUrl';
import { UserInfo } from '../partial/user-info/UserInfo';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  config$: Observable<Application[]> = this.http.get<Application[]>(`/${environment.context}/config`).pipe(shareReplay(1));

  constructor(private http: HttpClient) { }

  getConfig(): Observable<Application[]> {
    return this.config$;
  }

  search(s: ApplicationSearch): Observable<SearchResult[]> {
    return this.http.post<SearchResult[]>(`/${environment.context}/search`, s);
  }

  listLogs(app: ApplicationSearch): Observable<Log[]> {
    return this.http.post<Log[]>(`/${environment.context}/list-logs`, app);
  }

  tailLogs(app: TailLog): Observable<SearchResult> {
    return this.http.post<SearchResult>(`/${environment.context}/tail-log`, app);
  }

  stats(app: TailLog) {
    return this.http.post(`/${environment.context}/stats`, app);
  }

  errors(app: TailLog) {
    return this.http.post(`/${environment.context}/errors`, app);
  }

  basename(url: string): string {
    let hostname;
    if (url.indexOf('/') > -1) {
      hostname = url.split('/')[2];
    } else {
      hostname = url.split('/')[0];
    }
    hostname = hostname.split(':')[0];
    hostname = hostname.split('?')[0];
    return hostname;
  }

  downloadLog(log: string, host: string) {
    return this.http.post(`/${environment.context}/download-log`, { log, host }, { responseType: 'blob' });
  }

  requestTester() {
    return this.http.get(`/${environment.context}/support/request-details`);
  }

  invokeSupportUrl(su: SupportUrl) {
    if (su.method === 'get') {
      return this.http.get(`/${environment.context}/support/proxy?url=${su.url}`, {headers: su.headers})
    }
  }

  getUser(user: string): Observable<UserInfo> {
    return this.http.get<UserInfo>(`/${environment.context}/user-details?user=${user}`)
  }

}
