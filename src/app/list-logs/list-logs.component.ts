import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { Log } from './log'
import * as fileSaver from 'file-saver';
import { Application } from '../model/application';
import { asEndpoint } from '../model/app-host'

@Component({
  selector: 'app-list-logs',
  templateUrl: './list-logs.component.html',
  styleUrls: ['./list-logs.component.css']
})
export class ListLogsComponent implements OnInit {

  logs: Log[];
  loading = false;
  app: Application

  displayedColumns: string[] = ['name', 'modtime', 'size'];

  constructor(
    private commonService: CommonService) {
  }

  ngOnInit(): void {
  }

  download(log: string): void {
    //todo
    const endpoint = this.app.hosts[0].endpoint
    this.commonService.downloadLog(log, endpoint).subscribe((res: Blob) => fileSaver.saveAs(res, this.basename(log)));
  }

  onHostsUpdated(app: Application) {
    this.app = app
  }

  getLogs() {
    this.loading = true;
    //todo
    this.commonService.listLogs(asEndpoint(this.app.hosts[0])).subscribe((d: Log[]) => {
      this.logs = d;
      this.loading = false;
    });
  }

  basename(path): string {
    return path.replace(/.*\//, '');
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
