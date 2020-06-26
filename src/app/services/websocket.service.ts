import { Injectable } from '@angular/core';
import { webSocket } from 'rxjs/webSocket';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { SearchResult } from '../logs/search-result';




@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  constructor() {
  }

  appsHealth() {
    return webSocket(`${environment.ws}/ws/apps-health`);
  }

  tailLog(msg): [WebSocket, Subject<SearchResult>] {
    const ws = new WebSocket(`${environment.ws}/ws/tail-log`);
    const subject = new Subject<SearchResult>();
    ws.onopen = (evt) => {
      console.log('opened ws connection');
      ws.send(JSON.stringify(msg));
    };
    ws.onmessage = (evt) => {
      subject.next(JSON.parse(evt.data));
    };
    ws.onclose = (evt) => {
      console.log('closed ws connection', evt);
    };
    return [ws, subject];

  }


}
