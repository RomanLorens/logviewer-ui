import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-request-tester',
  templateUrl: './request-tester.component.html',
  styleUrls: ['./request-tester.component.css']
})
export class RequestTesterComponent implements OnInit {

  results
  headers
  cookies
  others

  displayedColumns: string[] = ['header', 'value']

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.commonService.requestTester().subscribe(d => {
      this.results = d
      this.headers = Object.keys(d['requestHeaders']).map((k) => ({ name: k, value: d['requestHeaders'][k] }))
      this.cookies = Object.keys(d['requestCookies']).map((k) => ({ name: k, value: d['requestCookies'][k] }))
      this.others = []
      this.others.push({ name: 'Host', value: d['host'] })
      this.others.push({ name: 'Remote Address', value: d['remoteAddress'] })
    })
  }

}
