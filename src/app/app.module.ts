import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { ChartsModule } from 'ng2-charts'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LogsComponent } from './logs/logs.component';
import { SpinnerComponent } from './partial/spinner.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListLogsComponent } from './list-logs/list-logs.component';
import { ConfigComponent } from './partial/config/config.component';
import { TailLogsComponent } from './tail-logs/tail-logs.component';
import { LogResultComponent } from './partial/log-result/log-result.component';
import { HealthComponent } from './health/health.component';
import { StatsComponent } from './stats/stats.component';
import { StatsErrorComponent } from './stats/stats-error.component';
import { ErrorComponent } from './error/error.component';
import { FullConfigComponent } from './partial/full-config/full-config.component';
import { RequestTesterComponent } from './request-tester/request-tester.component';
import { SupportUrlComponent } from './support-url/support-url.component';
import { UserInfoComponent } from './partial/user-info/user-info.component';
import { SupportConfigComponent } from './support-config/support-config.component';
import { SupportConfigSaveComponent } from './support-config/support-config-save/support-config-save.component';
import { UnsubscribeComponent } from './partial/unsubscribe.component';
import { MatNativeDateModule } from '@angular/material/core';
import { ChartComponent } from './partial/chart/chart.component'

@NgModule({
  declarations: [
    AppComponent,
    LogsComponent,
    SpinnerComponent,
    ListLogsComponent,
    ConfigComponent,
    TailLogsComponent,
    LogResultComponent,
    HealthComponent,
    StatsComponent,
    StatsErrorComponent,
    ErrorComponent,
    FullConfigComponent,
    RequestTesterComponent,
    SupportUrlComponent,
    UserInfoComponent,
    SupportConfigComponent,
    SupportConfigSaveComponent,
    UnsubscribeComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,

    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatDialogModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatExpansionModule,
    MatButtonModule,
    MatChipsModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatStepperModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
