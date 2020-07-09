import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogsComponent } from './logs/logs.component';
import { ListLogsComponent } from './list-logs/list-logs.component';
import { TailLogsComponent } from './tail-logs/tail-logs.component';
import { HealthComponent } from './health/health.component';
import { StatsComponent } from './stats/stats.component';

const routes: Routes = [
  { path: 'logs', component: LogsComponent },
  { path: 'logs/:reqid', component: LogsComponent },
  { path: 'list-logs', component: ListLogsComponent },
  { path: 'tail-logs', component: TailLogsComponent },
  { path: 'health', component: HealthComponent },
  { path: 'stats', component: StatsComponent },
  { path: '', pathMatch: 'full', redirectTo: 'logs' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
