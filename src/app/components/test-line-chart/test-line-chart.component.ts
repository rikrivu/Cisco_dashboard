import { Component, OnInit } from '@angular/core';
import * as allData from '../dummyData/data';

@Component({
  selector: 'app-test-line-chart',
  templateUrl: './test-line-chart.component.html',
  styleUrls: ['./test-line-chart.component.scss']
})
export class TestLineChartComponent implements OnInit {

  sampleData: any[] = allData.data.productFamilyDetails.Quarterly_Data;


  padding: any = { left: 20, top: 20, right: 20, bottom: 20 };
  titlePadding: any = { left: 90, top: 0, right: 0, bottom: 10 };

  xAxis: any =
  {
      dataField: 'Year',
      unitInterval: 1,
      tickMarks: { visible: false, interval: 1 },
      gridLinesInterval: { visible: true, interval: 1 },
      valuesOnTicks: false,
      padding: { bottom: 10 },
      showGridLines: false,
      labels: {
        angle: -60,
        rotationPoint: 'topright',
        offset: { x: 0, y: -15 }
      }
  };

  valueAxis: any =
  {
      unitInterval: 10000000,
      minValue: Math.min.apply(null, this.sampleData.map(i => i.Total_Value_chart)),
      maxValue: Math.max.apply(null, this.sampleData.map(i => i.Total_Value_chart)),
      title: { text: '' },
      labels: {
        offset: { x: -5, y: 0 }
      },
      showTickMarks: false,
      formatFunction: this.convertToMillions
  };

  seriesGroups: any[] =
  [
    {
      type: 'line',
      displayText: 'Test',
      series:
      [
        {
          dataField: 'Total_Value_chart',
          symbolType: 'circle',
          labels:
          {
            visible: false
          },
          formatFunction: (value) => this.convertToMillions(value, true),
          toolTipFormatFunction: (value, iIndex, sIndex, gIndex, xAxisValue) => {
            return '<div class="corp-name">' + xAxisValue + '</div>' +
            '<div class="revenue">Revenue</div>' +
            '<div class="amount">' + this.convertToMillions(value, true) + '</div>';
          }
        }
      ]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  convertToMillions(value: number, isDecimal?: boolean): string {
    let millionVal: any = Math.floor(value / 1000000);
    if (isDecimal) {
      millionVal = (value / 1000000).toFixed(1);
    }
    return '$' + millionVal + 'M';
  }

}
