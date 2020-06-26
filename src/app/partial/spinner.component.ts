import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
})
export class SpinnerComponent implements OnInit {

  @Input() loading = false;

  @Input() loadingInfo: string;

  constructor() { }

  ngOnInit(): void {
  }

}