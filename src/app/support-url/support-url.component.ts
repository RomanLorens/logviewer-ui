import { Component, OnInit } from '@angular/core';
import { TailLog } from '../tail-logs/tail-log';
import { SupportUrl } from '../logs/SupportUrl';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-support-url',
  templateUrl: './support-url.component.html',
  styleUrls: ['./support-url.component.css']
})
export class SupportUrlComponent implements OnInit {

  app: TailLog
  result
  currentUrl: string

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
  }

 stopPropagation() {
    document.querySelectorAll('.invoke-icon').forEach(item => {
      item.addEventListener('click', evt => evt.stopPropagation())
    })
  }

  onApplication(app: TailLog) {
    this.result = null
    this.app = app
    this.stopPropagation()
  }

  onInvoke(su: SupportUrl) {
    this.result = null
    this.currentUrl = su.url
    this.commonService.invokeSupportUrl(su).subscribe(d => this.result = d)
  }

  trackByFn(index: any, item: any) {
    return index
  }

}
