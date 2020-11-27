import { Component, OnInit, Input } from '@angular/core';
import { SearchResult } from 'src/app/logs/search-result';

@Component({
  selector: 'app-log-result',
  templateUrl: './log-result.component.html',
  styleUrls: ['./log-result.component.css']
})
export class LogResultComponent implements OnInit {

  @Input() results: SearchResult;

  constructor() { }

  ngOnInit(): void {
  }

  host(url: string) {
    let hostname;
    if (url.indexOf('/') > -1) {
      hostname = url.split('/')[2];
    } else {
      hostname = url.split('/')[0];
    }
    hostname = hostname.split(':')[0];
    hostname = hostname.split('?')[0];
    return hostname;
  }

  date() {
    return new Date();
  }

  line(l): string {
    if (l.includes(('|ERROR|'))) {
      return `<div class="text-danger">${l}</div>`;
    } else if ( l.includes('|WARNING|') || l.includes('|WARN|') ) {
      return `<div class="text-warning">${l}</div>`;
    }
    return l;
  }


}
