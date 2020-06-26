import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { Log } from './log'
import { ApplicationSearch } from '../logs/application-search';

@Component({
  selector: 'app-list-logs',
  templateUrl: './list-logs.component.html',
  styleUrls: ['./list-logs.component.css']
})
export class ListLogsComponent implements OnInit {

  logs: Log[];
  loading = false;
  search: ApplicationSearch;

  displayedColumns: string[] = ['name', 'modtime', 'size'];

  constructor(private commonService: CommonService) {
  }

  ngOnInit(): void {
    this.search = new ApplicationSearch();
  }

  onHostsUpdated(host) {
    this.search.hosts = host.hosts.map(h => h.endpoint);
    this.search.logs = host.hosts[0].paths;
  }

  getLogs() {
    this.loading = true;
    this.commonService.listLogs(this.search).subscribe((d: Log[]) => {
      this.logs = d;
      this.loading = false;
    });
  }

  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

}
