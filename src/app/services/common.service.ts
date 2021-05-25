import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Application } from '../model/application';
import { Observable } from 'rxjs';
import { shareReplay, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { SearchResult } from '../logs/search-result';
import { Log } from '../list-logs/log';
import { SupportUrl } from '../model/SupportUrl';
import { UserInfo } from '../partial/user-info/UserInfo';
import { AppStats } from '../stats/app_stats';
import { SearchRequest } from '../model/search-request';
import { LogRequest } from '../model/log-request';
import { StatsRequest } from '../model/stats-request';
import { EndpointHost } from '../model/endpoint-host';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  config$: Observable<Application[]> = this.http.get<Application[]>(`/${environment.context}/config`)
    .pipe(map(c => {
      return c.map(app => {
        app.supportUrls.map(su => {
          su._headers = []
          if (su.headers) {
            for (const [key, value] of Object.entries(su.headers)) {
              su._headers.push({ key: key, value: value as string })
            }
          }
          return su
        })
        return app
      })
    }),
      shareReplay(1));

  constructor(private http: HttpClient) { }

  getConfig(): Observable<Application[]> {
    return this.config$;
  }

  search(s: SearchRequest): Observable<SearchResult[]> {
    return this.http.post<SearchResult[]>(`/${environment.context}/search`, s);
  }

  listLogs(app: EndpointHost): Observable<Log[]> {
    return this.http.post<Log[]>(`/${environment.context}/list-logs`, app);
  }

  tailLogs(app: LogRequest): Observable<SearchResult> {
    return this.http.post<SearchResult>(`/${environment.context}/tail-log`, app);
  }

  stats(req: StatsRequest) {
    return this.http.post(`/${environment.context}/stats`, req)
  }

  errors(app: StatsRequest) {
    return this.http.post(`/${environment.context}/errors`, app)
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

  downloadLog(log: string, endpoint: string) {
    return this.http.post(`/${environment.context}/download-log`, { log, endpoint }, { responseType: 'blob' });
  }

  requestTester() {
    return this.http.get(`/${environment.context}/support/request-details`);
  }

  invokeSupportUrl(host: string, su: SupportUrl) {
    if (su.method === 'get') {
      let url = host
      if (!url.endsWith("/")) {
        url += "/"
      }
      if (su.url.startsWith("/")) {
        url += su.url.substr(1)
      } else {
        url += su.url
      }
      return this.http.get(`/${environment.context}/support/proxy?url=${url}`, { headers: su.headers })
    }
  }

  getUser(user: string): Observable<UserInfo> {
    return this.http.get<UserInfo>(`/${environment.context}/user-details?user=${user}`)
  }

  updateConfig(app: Application) {
    return this.http.post(`/${environment.context}/support/update-config`, app)
  }

  getStats(stats: any): Observable<AppStats[]> {
    return this.http.post<AppStats[]>(`/${environment.context}/app-stats`, stats)
  }

}
