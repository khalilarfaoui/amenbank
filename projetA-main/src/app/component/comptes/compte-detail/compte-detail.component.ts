import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartOptions, ChartType, ChartDataset, registerables } from 'chart.js';

@Component({
  selector: 'app-compte-detail',
  standalone: true,
  imports: [],
  templateUrl: './compte-detail.component.html',
  styleUrl: './compte-detail.component.css'
})
export class CompteDetailComponent implements OnInit {

  @ViewChild('myBarChart', { static: true }) myBarChart!: ElementRef<HTMLCanvasElement>;

  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };
  public barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartData: ChartDataset<'bar'>[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.initializeChart();
  }

  initializeChart(): void {
    new Chart(this.myBarChart.nativeElement, {
      type: this.barChartType,
      data: {
        labels: this.barChartLabels,
        datasets: this.barChartData
      },
      options: this.barChartOptions
    });
  }
}
