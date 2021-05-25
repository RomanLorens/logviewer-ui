import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';
import { Application } from '../model/application';
import { MatDialog } from '@angular/material/dialog';
import { SupportConfigSaveComponent } from './support-config-save/support-config-save.component';

@Component({
  selector: 'app-support-config',
  templateUrl: './support-config.component.html',
  styleUrls: ['./support-config.component.css']
})
export class SupportConfigComponent implements OnInit {

  app: Application

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  onHostsUpdated(app: Application) {
    this.app = app
  }

  showUpdateDialog(update = true) {
    let app: Application
    if (!update) {
      app = {
        hosts: [{}],
        logStructure: {date: 0, user: 1, reqid: 2, level: 3, message: 5},
        supportUrls: [{_headers: []}]
      } as Application
    } else {
      app = this.app
    }
    this.dialog.open(SupportConfigSaveComponent, {data: app, maxHeight: '700px'})
  }

}
