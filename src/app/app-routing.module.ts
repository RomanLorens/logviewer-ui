import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogsComponent } from './logs/logs.component';
import { ListLogsComponent } from './list-logs/list-logs.component';
import { TailLogsComponent } from './tail-logs/tail-logs.component';
import { HealthComponent } from './health/health.component';
import { StatsComponent } from './stats/stats.component';
import { ErrorComponent } from './error/error.component';
import { RequestTesterComponent } from './request-tester/request-tester.component';
import { SupportUrlComponent } from './support-url/support-url.component';
import { AuthGuard } from './auth/auth.guard';
import { SupportConfigComponent } from './support-config/support-config.component';

const routes: Routes = [
  { path: 'logs', component: LogsComponent },
  { path: 'logs/:reqid', component: LogsComponent },
  { path: 'list-logs', component: ListLogsComponent },
  { path: 'tail-logs', component: TailLogsComponent },
  { path: 'health', component: HealthComponent },
  { path: 'stats', component: StatsComponent },
  { path: 'errors', component: ErrorComponent },
  { path: 'request-tester', component: RequestTesterComponent },
  { 
    path: 'support-urls', 
    component: SupportUrlComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'support-config', 
    component: SupportConfigComponent,
    canActivate: [AuthGuard]
  },
  { path: '', pathMatch: 'full', redirectTo: 'logs' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
