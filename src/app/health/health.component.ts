import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../services/websocket.service';
import { CommonService } from '../services/common.service';
import { Application } from '../model/application';
import { Host } from './host';

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.css']
})
export class HealthComponent implements OnInit {

  hosts: Host[];
  displayedColumns: string[] = ['app', 'env', 'status'];

  constructor(
    private ws: WebsocketService,
    private commonService: CommonService) { }

  ngOnInit(): void {
    this.commonService.getConfig().subscribe((apps: Application[]) => {
      this.hosts = [];
      apps.forEach(app => {
        let health = app.supportUrls.find(s => s.name === 'health')
        if (health) {
          app.hosts.forEach(h => {
              let url = h.appHost
              url += health.url
              this.hosts.push({ App: app.application, Host: url, Env: app.env, Status: -1 });
          });
        }
      });

      this.ws.appsHealth().subscribe((d: Host) => {
        const host = this.hosts.find(h => h.Host === d.Host);
        host.Status = d.Status;
      });

    });
  }

  power(status: number) {
    return status === 200 ? 'power' : 'power_off';
  }

}
