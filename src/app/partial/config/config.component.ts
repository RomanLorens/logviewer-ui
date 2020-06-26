import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UnsubscribeComponent } from '../unsubscribe.component';
import { CommonService } from 'src/app/services/common.service';
import { Application } from 'src/app/logs/Application';

@Component({
  selector: 'app-log-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent extends UnsubscribeComponent implements OnInit {
  apps: Map<string, any[]>;
  application: string;
  env: string;
  envs: string[];
  value = '';
  hosts: Application[];
  loading = false;

  @Output() hostsUpdated = new EventEmitter<any[]>();

  constructor(private commonService: CommonService) {
    super();
  }

  ngOnInit(): void {
    this.subscription = this.commonService.getConfig().subscribe((apps: Application[]) => {
      const m = new Map();
      apps.forEach(app => {
        let a = m.get(app.application);
        if (!a) {
          a = [];
          m.set(app.application, a);
        }
        if (!this.application) {
          this.application = app.application;
        }
        a.push(app);
      });
      this.apps = m;

      const chosenApp = JSON.parse(window.localStorage.getItem('chosen-application'));
      if (chosenApp && this.apps.get(chosenApp['app'])) {
        this.application = chosenApp['app'];
      } else {
        this.application = apps[0].application;
      }
      this.env = this.apps.get(this.application)[0].env;
      this.onAppSelected(this.application);
    });

  }

  onAppSelected(app: string) {
    this.envs = this.apps.get(app).map(a => a.env);
    this.hosts = this.apps.get(app).find(a => a.env === this.env);
    if (!this.hosts) {
      this.hosts = this.apps.get(app)[0];
    }
    window.localStorage.setItem('chosen-application', JSON.stringify({ app, env: this.env }));
    this.hostsUpdated.emit(this.hosts);
  }

}
