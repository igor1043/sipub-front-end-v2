import { Component, Input } from '@angular/core';
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
  colors: string[];
};

@Component({
  selector: 'app-apex-chart',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule],
  templateUrl: './apex-chart.component.html',
  styleUrls: ['./apex-chart.component.css']
})
export class ApexChartComponent {
  @Input() chartData: any[] = [];
  @Input() categories: string[] = [];
  @Input() chartTitle: string = 'Gráfico de Barras';
  @Input() yAxisSuffix: string = '%';
  @Input() height: number = 350;
  @Input() barColor: string = '#FF0000'; 

  public chartOptions: ChartOptions;

  constructor() {
    this.chartOptions = this.createChartOptions();
  }

  ngOnChanges() {
    this.chartOptions = this.createChartOptions();
  }

  private createChartOptions(): ChartOptions {
    return {
      series: [{
        name: 'Valores',
        data: this.chartData
      }],
      chart: {
        height: this.height,
        type: 'bar'
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          borderRadiusApplication: 'end',
          dataLabels: {
            position: 'top'
          }
        }
      },
      colors: [this.barColor], // Usa a cor vermelha definida
      dataLabels: {
        enabled: true,
        formatter: (val) => val + this.yAxisSuffix,
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ['#304758']
        }
      },
      xaxis: {
        categories: this.categories,
        position: 'bottom',
        labels: {
          offsetY: 0
        },
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        tooltip: {
          enabled: true
        }
      },
      fill: {
        type: 'solid',
        opacity: 1
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
          formatter: (val) => val + this.yAxisSuffix
        }
      },
      title: {
        text: this.chartTitle,
        floating: false,
        offsetY: 0,
        align: 'center',
        margin: 10,
        style: {
          color: '#444',
          fontSize: '16px',
          fontWeight: 'bold'
        }
      }
    };
  }
}