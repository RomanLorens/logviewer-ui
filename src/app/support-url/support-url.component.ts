import { Component, OnInit } from '@angular/core';
import { ApplicationLogRequest } from '../model/application-log-request';
import { SupportUrl } from '../model/SupportUrl';
import { CommonService } from '../services/common.service';
import { AppSupportUrl } from '../model/app-support-url';

@Component({
  selector: 'app-support-url',
  templateUrl: './support-url.component.html',
  styleUrls: ['./support-url.component.css']
})
export class SupportUrlComponent implements OnInit {

  app: ApplicationLogRequest
  result
  currentUrl: string
  appSupportUrl: AppSupportUrl

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
  }

 stopPropagation() {
    document.querySelectorAll('.invoke-icon').forEach(item => {
      item.addEventListener('click', evt => evt.stopPropagation())
    })
  }

  onApplication(app: ApplicationLogRequest) {
    this.result = null
    this.app = app
    this.stopPropagation()
  }

  onSupportURLs(urls: AppSupportUrl) {
    this.appSupportUrl = urls
  }

  onInvoke(su: SupportUrl, appHost: string) {
    this.result = null
    this.currentUrl = su.url
    this.commonService.invokeSupportUrl(appHost, su).subscribe(d => this.result = d)
  }

  trackByFn(index: any, item: any) {
    return index
  }

}
