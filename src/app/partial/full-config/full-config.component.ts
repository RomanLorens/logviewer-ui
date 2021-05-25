import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Application } from 'src/app/model/application';
import { CommonService } from 'src/app/services/common.service';
import { ApplicationLogRequest } from 'src/app/model/application-log-request';
import { SupportUrl } from 'src/app/model/SupportUrl';
import { AppSupportUrl } from 'src/app/model/app-support-url';

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

  @Output() application = new EventEmitter<ApplicationLogRequest>();
  @Output() supportURLs = new EventEmitter<AppSupportUrl>()

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
    const t = {} as ApplicationLogRequest
    t.endpoint = app.hosts[0].endpoint
    t.log = app.hosts[0].paths[0]
    //TODO what if more than one hosts
    t.logStructure = app.logStructure
    this.application.emit(t)
    this.supportURLs.emit({ supportUrls: app.supportUrls, appHost: app.hosts[0].appHost } as AppSupportUrl)
  }

  basename(u: string): string {
    return this.commonService.basename(u);
  }

  onLogSelected(log: string) {
    const t = {} as ApplicationLogRequest
    t.endpoint = this.app.hosts[0].endpoint
    t.log = log
    this.application.emit(t)
  }

  loadOlderLogs() {
    //todo hosts 0 ???
    this.commonService.listLogs(this.app.hosts[0]).subscribe(d => {
      this.paths = d.map(l => l.name);
    });
  }

}
