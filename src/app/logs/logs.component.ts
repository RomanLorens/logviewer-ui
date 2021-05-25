import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonService } from '../services/common.service';
import { Application } from '../model/application'
import { SearchResult } from './search-result';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { SearchRequest } from '../model/search-request';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.css']
})
export class LogsComponent implements OnInit {

  value = '';
  results: SearchResult[];
  app: Application;
  loading = false;
  host = 'All';
  logs: string[];
  log = 'All';
  searchFromUrl = false;
  olderLogs = false;

  constructor(
    private commonService: CommonService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params.reqid) {
        this.value = params.reqid;
        this.searchFromUrl = true;
      }
    });
  }

  basename(url: string): string {
    return this.commonService.basename(url);
  }

  loadOlderLogs() {
    if (this.olderLogs) {
      //todo hosts or host???
      this.commonService.listLogs(this.app.hosts[0]).subscribe(d => {
        this.logs = d.map(l => l.name);
      });
    } else {
      this.onHostsUpdated(this.app, false);
    }
  }

  onHostsUpdated(app, uncheckOldLogs = true): void {
    this.app = app;
    this.logs = app.hosts[0].paths;
    if (this.searchFromUrl) {
      this.search();
      this.searchFromUrl = false;
    }
    if (uncheckOldLogs) {
      this.olderLogs = false;
    }
  }

  onHostChanged(host) {
    const match = this.app.hosts.find(e => e.endpoint.includes(host));
    this.logs = match.paths;
  }

  search() {
    const s = {
      value : this.value,
      hosts: []
    } as SearchRequest

    if (this.host === 'All') {
      s.hosts = this.app.hosts
    } else {
      //TODO should respect ui selection
      s.hosts.push(this.app.hosts[0]);
    }
    
    if (s.value.trim() === '') {
      this.snackBar.open('There must be specified search value ', 'Error', {
        duration: 2000,
      });
      return;
    }
    this.loading = true;
    this.results = [];
    this.commonService.search(s).subscribe((d: SearchResult[]) => {
      this.loading = false;
      this.results = d;
    });
  }

}
