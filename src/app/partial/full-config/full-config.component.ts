import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Application } from 'src/app/logs/Application';
import { CommonService } from 'src/app/services/common.service';
import { TailLog } from 'src/app/tail-logs/tail-log';
import { ApplicationSearch } from 'src/app/logs/application-search';

@Component({
  selector: 'app-full-config',
  templateUrl: './full-config.component.html',
  styleUrls: ['./full-config.component.css']
})
export class FullConfigComponent implements OnInit {

  app: Application;
  host: string;
  log: string;
  paths: string[];

  @Output() application = new EventEmitter<TailLog>();

  @Input() withOlderLogs = false
  @Input() hideLog = false

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
  }

  onHostsUpdated(app: Application) {
    this.app = app
    this.host = app.hosts[0].endpoint
    this.paths = app.hosts[0].paths
    this.log = this.paths[0]
    const t = new TailLog()
    t.application = app.application
    t.env = app.env
    t.host = app.hosts[0].endpoint
    t.log = app.hosts[0].paths[0]
    t.supportUrls = app.supportUrls
    this.application.emit(t)
  }

  basename(u: string): string {
    return this.commonService.basename(u);
  }

  onLogSelected(log: string) {
    const t = new TailLog()
    t.application = this.app.application
    t.env = this.app.env
    t.host = this.app.hosts[0].endpoint
    t.log = log
    this.application.emit(t)
  }

  loadOlderLogs() {
    const search = new ApplicationSearch();
    search.hosts = this.app.hosts.map(h => h.endpoint);
    search.logs = [].concat(...this.app.hosts.map(h => h.paths));
    this.commonService.listLogs(search).subscribe(d => {
      this.paths = d.map(l => l.name);
    });
  }

}
