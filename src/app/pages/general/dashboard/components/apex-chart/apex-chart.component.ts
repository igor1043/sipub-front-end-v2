import { Component } from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexPlotOptions,
  ApexYAxis,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexFill
} from 'ng-apexcharts';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-apex-chart',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  template: `
    <div id="chart">
      <apx-chart
        [series]="chartOptions.series"
        [chart]="chartOptions.chart"
        [dataLabels]="chartOptions.dataLabels"
        [plotOptions]="chartOptions.plotOptions"
        [yaxis]="chartOptions.yaxis"
        [xaxis]="chartOptions.xaxis"
        [fill]="chartOptions.fill"
        [title]="chartOptions.title"
      ></apx-chart>
    </div>
  `,
  styles: [
    `
      #chart {
        max-width: 100%;
        margin: 35px auto;
      }
    `
  ]
})
export class ApexChartComponent {
  public chartOptions: ChartOptions;

  constructor() {
    this.chartOptions = <ChartOptions>{
      series: [
        {
          name: 'Inflation',
          data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
        }
      ],
      chart: {
        height: 350,
        type: 'bar'
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: 'top'
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: val => val + '%',
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#304758']
        }
      },
      xaxis: {
        categories: [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ],
        position: 'top',
        labels: {
          offsetY: -18
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
        tooltip: {
          enabled: true,
          offsetY: -35
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'light',
          type: 'horizontal',
          shadeIntensity: 0.25,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100, 100]
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: false,
          formatter: val => val + '%'
        }
      },
      title: {
        text: 'Monthly Inflation in Argentina, 2002',
        floating: false,
        offsetY: 320,
        align: 'center',
        style: {
          color: '#444'
        }
      }
    };
  }
}
