import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UnsubscribeComponent } from '../unsubscribe.component';
import { CommonService } from 'src/app/services/common.service';
import { Application } from 'src/app/model/application';

@Component({
  selector: 'app-log-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent extends UnsubscribeComponent implements OnInit {
  apps: Map<string, Application[]>;
  envs: string[];
  value = '';
  loading = false;
  application: string;
  env: string;

  @Output() hostsUpdated = new EventEmitter<Application>();

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
        a.push(app);
      });
      this.apps = m;

      let chosenApp = null;
      try {
        chosenApp = JSON.parse(window.localStorage.getItem('chosen-application'));
      } catch (err) {
        console.error(err);
      }
      if (!chosenApp) {
        chosenApp = apps[0];
      } else {
      }
      this.application = chosenApp.application;
      this.onAppSelected(chosenApp.application, chosenApp.env);
    });
  }

  onEnvSelected(env: string) {
    this.env = env;
    const app = this.apps.get(this.application);
    const cfg = app.find(e => e.env === env);
    window.localStorage.setItem('chosen-application', JSON.stringify(cfg));
    this.hostsUpdated.emit(Object.assign({}, cfg));
  }

  onAppSelected(app: string, env?: string) {
    this.application = app;
    this.envs = this.apps.get(app).map(a => a.env);
    if (env) {
      this.onEnvSelected(env);
    } else {
      this.onEnvSelected(this.envs[0]);
    }
  }
}
