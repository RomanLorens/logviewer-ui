import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,

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
    MatCheckboxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
