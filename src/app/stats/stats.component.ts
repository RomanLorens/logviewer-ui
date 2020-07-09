import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { Application } from '../logs/Application';
import { TailLog } from '../tail-logs/tail-log';
import { StatsErrorComponent } from './stats-error.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  app: Application;
  host: string;
  log: string;
  paths: string[];
  displayedColumns: string[] = ['position', 'user', 'lastAccess', 'counter'];
  dataSource;

  constructor(
    private commonService: CommonService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  stats() {
    const t = new TailLog();
    t.application = this.app.application;
    t.env = this.app.env;
    t.host = this.host;
    t.log = this.log;
    this.commonService.stats(t).subscribe(d => {
      const arr = Object.keys(d).map(user => {
        const res = d[user];
        res.user = user;
        const pos = res.lastTime.indexOf(',');
        if (pos !== -1) {
          res.time = new Date(res.lastTime.substring(0, pos)).getTime();
        } else {
          res.time = new Date(res.lastTime).getTime();
        }
        return res;
      });
      arr.sort((a, b) => b.time - a.time);
      this.dataSource = arr;
    });
  }

  showErrors(errors) {
    this.dialog.open(StatsErrorComponent, {data: errors});
  }

  onHostsUpdated(app) {
    this.app = app;
    this.host = app.hosts[0].endpoint;
    this.paths = app.hosts[0].paths;
    this.log = this.paths[0];
  }

  basename(u: string): string {
    return this.commonService.basename(u);
  }

}
