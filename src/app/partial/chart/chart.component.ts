import { Component, OnInit, Input } from '@angular/core';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  @Input() datasets: ChartDataSets[]
  @Input() labels: Label[]
  @Input() chartType = 'line'
  @Input() wrapperWidth = 'chart-wrapper-full'
  @Input() withPluginDataLabels: boolean = false

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
        display: false,
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
  chartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(0,255,0,0.3)',
    },
    {
      borderColor: 'black',
      backgroundColor: 'rgba(0,0,255,0.3)',
    },
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ]
  chartLegend = true
  chartPlugins = [pluginDataLabels]

  constructor() {
  }

  ngOnInit(): void {
    if (this.withPluginDataLabels === true) {
      this.chartOptions.plugins.datalabels.display = true
    }
  }

}
