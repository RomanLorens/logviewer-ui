import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../services/common.service';
import { TailLog } from '../tail-logs/tail-log';
import { ErrorDetails } from './error-details';
import { MatPaginator } from '@angular/material/paginator';
import { ErrorDataSource } from './error-datasource';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  log: TailLog;
  displayedColumns: string[] = ['id', 'user', 'message', 'date'];
  results: ErrorDetails[];
  pagination = {
    from: 0,
    total: 0,
    size: 10
  }
  dataSource: ErrorDataSource

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.dataSource = new ErrorDataSource(this.commonService)
    this.dataSource.total$.subscribe(t => this.pagination.total = t)
  }

  errors() {
    this.log.from = this.paginator.pageIndex
    this.log.size = this.paginator.pageSize
    this.dataSource.fetch(this.log)
  }

  ngAfterViewInit() {
    this.paginator.page
      .pipe(
        tap(() => this.errors())
      )
      .subscribe();
  }

  onApplication(log) {
    this.log = log
    this.paginator.pageIndex = 0
    this.paginator.pageSize = 0
  }

  icon(level: string): string {
    return level === 'ERROR' ? 'error_outline' : 'warning'
  }

}
