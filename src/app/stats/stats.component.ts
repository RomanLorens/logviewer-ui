import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonService } from '../services/common.service';
import { Application } from '../model/application';
import { StatsErrorComponent } from './stats-error.component';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { Label } from 'ng2-charts';
import { ChartDataSets } from 'chart.js';
import { StatsRequest } from '../model/stats-request';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  app: Application;
  host: string;
  log: string;
  paths: string[];
  displayedColumns: string[] = ['position', 'user', 'lastAccess', 'counter'];
  dataSource;
  olderLogs = false;
  dateForm: FormGroup
  @ViewChild(MatTabGroup, { static: true }) tabs: MatTabGroup
  currentTab = 0

  labels: Label[] = []
  chartDatasets: ChartDataSets[] = []
  usersCountDatasets: ChartDataSets[] = []
  usersTimeRangeLabels: Label[] = []
  usersTimeRangeDatasets: ChartDataSets[] = []

  constructor(
    private commonService: CommonService,
    public dialog: MatDialog,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    let startDate = new Date()
    startDate.setHours(0, 0, 0, 0)
    startDate.setDate(startDate.getDate() - 7)
    this.dateForm = this.formBuilder.group({
      dateRange: this.formBuilder.group({
        startDate: startDate,
        endDate: new Date(),
      }),
    })
  }

  stats() {
    //todo
    const host = this.app.hosts[0]
    const req = {
      endpoint: host.endpoint,
      log: this.log,
      logStructure: this.app.logStructure
    } as StatsRequest

    this.resetCharts()
    this.tabs.selectedIndex = 0
    this.commonService.stats(req).subscribe(d => {
      this.tabs.realignInkBar()
      const arr = Object.keys(d).map(user => {
        const res = d[user];
        res.user = user;
        const pos = res.lastTime.indexOf(',');
        if (pos !== -1) {
          res.time = new Date(res.lastTime.substring(0, pos)).getTime();
        } else {
          res.time = new Date(res.lastTime).getTime();
        }
        return res;
      });
      arr.sort((a, b) => b.time - a.time);
      this.dataSource = arr;
    });
  }

  loadOlderLogs() {
    if (this.olderLogs) {
      //todo
      this.commonService.listLogs(this.app.hosts[0]).subscribe(d => {
        this.paths = d.map(l => l.name);
      });
    } else {
      this.onHostsUpdated(this.app, false);
    }
  }

  showErrors(errors) {
    this.dialog.open(StatsErrorComponent, { data: errors });
  }

  onHostsUpdated(app, uncheckOlderLogs = true) {
    this.app = app;
    this.host = app.hosts[0].endpoint;
    this.paths = app.hosts[0].paths;
    this.log = this.paths[0];
    if (uncheckOlderLogs) {
      this.olderLogs = false;
    }
    this.dataSource = null;
  }

  basename(u: string): string {
    return this.commonService.basename(u);
  }

  getFirstDate(level: string, element: any): string {
    let e = level === 'ERROR' ? element['errors'] : element['warnings']
    return e && e.length ? e[0].date : ''
  }

  resetCharts() {
    this.labels = []
    this.chartDatasets = []
    this.currentTab = this.tabs.selectedIndex
    this.usersCountDatasets = []
    this.usersTimeRangeLabels = []
    this.usersTimeRangeDatasets = []
  }

  onTabChanged() {
    if (this.tabs.selectedIndex === 0) {
      return
    }
    let req = {
      from: Math.ceil(this.dateForm.value.dateRange.startDate.getTime() / 1000),
      to: Math.ceil(this.dateForm.value.dateRange.endDate.getTime() / 1000),
      app: this.app.application,
      env: this.app.env,
      log: this.log
    }
    this.commonService.getStats(req).subscribe(d => {
      this.resetCharts()
      let requests = []
      let levels: Map<string, number>[] = []
      let levelNames = new Set<string>()
      let usersCount = []
      let users = new Map<string, Map<string, number>>()
      d.forEach(s => {
        this.labels.push(s.date)
        requests.push(s.stats.totalRequests)
        let l = new Map<string, number>()
        Object.keys(s.stats.users).forEach(user => {
          let um = users.get(user)
          if (!um) {
            um = new Map<string, number>()
            users.set(user, um)
          }
          Object.keys(s.stats.users[user]).forEach(level => {
            let count = l.get(level)
            if (!count) {
              count = 0
            }
            l.set(level, count + s.stats.users[user][level])
            levelNames.add(level)
            let ul = um.get(level)
            if (!ul) {
              um.set(level, 0)
              ul = 0
            }
            um.set(level, ul + s.stats.users[user][level])
          })
        })
        usersCount.push(Object.keys(s.stats.users).length)
        levels.push(l)
      })
      this.chartDatasets = [
        { data: requests, label: "Total Requests" }
      ]
      levelNames.forEach(l => {
        this.chartDatasets.push({
          data: levels.map(e => e.get(l)),
          label: l
        })
      })
      this.usersCountDatasets = [
        { data: usersCount, label: "Total Users" }
      ]
      let usersTimeRange = []
      let _usersTimeRangeLabels = []
      let userErrors = []
      for (let user of users.keys()) {
        let count = 0
        let errors = 0
        for (let _level of users.get(user)) {
          count += _level[1]
          if (_level[0] == "ERROR" || _level[0].includes("WARN")) {
            errors += _level[1]
          }
        }
        if (count || errors) {
          _usersTimeRangeLabels.push(user)
          usersTimeRange.push(count)
          userErrors.push(errors ? errors : undefined)
        }
      }
      this.usersTimeRangeDatasets = [{
        data: usersTimeRange,
        label: `User's Requests (${usersTimeRange.filter(e => e).reduce((a, b) => a + b, 0)})`
      }]
      let errors = userErrors.filter(e => e).reduce((a, b) => a + b, 0)
      if (errors) {
        this.usersTimeRangeDatasets.push({
          data: userErrors,
          label: `Error Requests (${errors})`
        })
      }
      this.usersTimeRangeLabels = _usersTimeRangeLabels
    })
  }

  onDateChanged(evt) {
    if (evt.value) {
      this.onTabChanged()
    }
  }

}
