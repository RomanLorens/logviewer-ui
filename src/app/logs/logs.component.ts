import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonService } from '../services/common.service';
import { Application } from './application'
import { ApplicationSearch } from './application-search'
import { SearchResult } from './search-result';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  constructor(private commonService: CommonService,
    private _snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  basename(url: string) {
    return this.commonService.basename(url);
  }

  onHostsUpdated(app) {
    this.app = app;
    this.logs = app.hosts[0].paths;
  }

  onHostChanged(host) {
    const match = this.app.hosts.find(e => e.endpoint.includes(host));
    this.logs = match.paths;
  }

  search() {
    const s = new ApplicationSearch();
    s.application = this.app.application;
    s.env = this.app.env;
    s.value = this.value;
    if (this.host === 'All') {
      s.hosts = this.app.hosts.map(h => h.endpoint);
    } else {
      s.hosts = [this.host];
    }
    if (this.log === 'All') {
      s.logs = this.logs;
    } else {
      s.logs = [this.log];
    }
    if (s.value.trim() === '') {
      this._snackBar.open('There must be specified search value ', 'Error', {
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
