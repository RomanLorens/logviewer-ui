import { Component, OnInit } from '@angular/core';
import { Application } from '../logs/Application';
import { TailLog } from './tail-log';
import { CommonService } from '../services/common.service';
import { SearchResult } from '../logs/search-result';
import { WebsocketService } from '../services/websocket.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-tail-logs',
  templateUrl: './tail-logs.component.html',
  styleUrls: ['./tail-logs.component.css']
})
export class TailLogsComponent implements OnInit {

  app: Application;
  host: string;
  paths: string[];
  path: string;
  loading = false;
  results: SearchResult;
  withWebsocket = false;
  ws: WebSocket;

  constructor(private commonService: CommonService, private websocket: WebsocketService) { }

  ngOnInit(): void {
  }

  basename(u): string {
    return this.commonService.basename(u);
  }

  onHostsUpdated(app) {
    this.onWebsocketChange();
    this.app = app;
    this.host = app.hosts[0].endpoint;
    this.paths = app.hosts[0].paths;
    this.path = this.paths[0];
  }

  onWebsocketChange() {
    if (this.ws) {
      console.log('closing ws connection...')
      this.ws.close(1000, 'client stops');
      this.ws = null;
    }
  }

  tailLog() {
    const t = new TailLog();
    t.application = this.app.application;
    t.env = this.app.env;
    t.host = this.host;
    t.log = this.path;
    this.loading = true;
    this.results = null;

    if (this.withWebsocket) {
      const wsDetails: [WebSocket, Subject<SearchResult>] = this.websocket.tailLog(t);
      this.ws = wsDetails[0];
      wsDetails[1].subscribe((d: SearchResult) => {
        this.results = d;
        this.results.lines = this.results.lines.reverse();
      });
      this.loading = false;
    } else {
      this.commonService.tailLogs(t).subscribe((d: SearchResult) => {
        this.results = d;
        this.results.lines = this.results.lines.reverse();
        this.loading = false;
      });
    }

  }

}
