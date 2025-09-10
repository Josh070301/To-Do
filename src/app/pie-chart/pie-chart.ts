import { ChangeDetectionStrategy, signal, computed, ChangeDetectorRef, Component, effect, inject, OnInit, PLATFORM_ID, input } from '@angular/core';
import { ChartModule } from 'primeng/chart';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-pie-chart',
  imports: [ChartModule],
  templateUrl: './pie-chart.html',
  styleUrl: './pie-chart.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieChart implements OnInit {
  // NOTE Inputs for flexibility
  chartData = input<number[]>([]);
  chartLabels = input<string[]>([]);
  chartColors = input<string[]>([]);
  chartHoverColors = input<string[]>([]);
  chartOptions = input<Record<string, unknown>>({});

  data = signal({
    labels: this.chartLabels(),
    datasets: [
      {
        data: this.chartData(),
        backgroundColor: this.chartColors(),
        hoverBackgroundColor: this.chartHoverColors()
      }
    ]
  }); 

  options = signal({});

  platformId = inject(PLATFORM_ID);
  cd = inject(ChangeDetectorRef);

  themeEffect = effect(() => {
    this.initChart();
  });

  ngOnInit() {
    this.initChart();
  }


  // Derived counts using computed signals
  totalCount = computed(() => this.chartData().reduce((a, b) => a + b, 0));
  pendingCount = computed(() => this.chartData()[0] ?? 0);
  completedCount = computed(() => this.chartData()[1] ?? 0);


  initChart() {
    if (isPlatformBrowser(this.platformId)) {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');

      this.data.set({
        labels: this.chartLabels(),
        datasets: [
          {
            data: this.chartData(),
            backgroundColor: this.chartColors(),
            hoverBackgroundColor: this.chartHoverColors()
          }
        ]
      });

      this.options.set({
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: textColor
            }
          }
        },
        ...this.chartOptions()
      });

      this.cd.markForCheck();
    }
  }
}