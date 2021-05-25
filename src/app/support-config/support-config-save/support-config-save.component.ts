import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Application } from 'src/app/model/application';
import { AppHost } from 'src/app/model/app-host';
import { SupportUrl } from 'src/app/model/SupportUrl';
import { stringify } from 'querystring';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-support-config-save',
  templateUrl: './support-config-save.component.html',
  styleUrls: ['./support-config-save.component.css']
})
export class SupportConfigSaveComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public app: Application,
    private commonService: CommonService
  ) {
  }

  ngOnInit(): void {
  }

  onUpdate() {
    this.app.supportUrls.map(su => {
      su.headers = {}
      su._headers.map(h => {
        su.headers[h.key] =h.value
      })
    })
    this.commonService.updateConfig(this.app).subscribe(res => {
      console.log(res)
    })
  }

  trackByFn(index: any, item: any) {
    return index
  }

  deleteHost(idx: number) {
    this.app.hosts.splice(idx, 1)
  }

  addHost() {
    this.app.hosts.push({ paths: [''] } as AppHost)
  }

  deletePath(hostIdx: number, pathIdx: number) {
    this.app.hosts[hostIdx].paths.splice(pathIdx, 1)
  }

  addPath(hostIdx: number) {
    this.app.hosts[hostIdx].paths.push('')
  }

  deleteSupportUrl(idx: number) {
    this.app.supportUrls.splice(idx, 1)
  }

  addSupportUrl() {
    this.app.supportUrls.push({} as SupportUrl)
  }

  deleteHeader(idx: number, headerIdx: number) {
    this.app.supportUrls[idx]._headers.splice(headerIdx, 1)
  }

  addHeader(idx: number) {
    this.app.supportUrls[idx]._headers.push({key: '', value: ''})
  }
}
