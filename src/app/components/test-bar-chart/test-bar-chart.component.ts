import { Component, OnInit } from '@angular/core';
import * as allData from '../dummyData/data';

@Component({
  selector: 'app-test-bar-chart',
  templateUrl: './test-bar-chart.component.html',
  styleUrls: ['./test-bar-chart.component.scss']
})
export class TestBarChartComponent implements OnInit {


sampleData: any[] = allData.data.productFamilyDetails.Bookings_Data;

padding: any = { left: 20, top: 20, right: 20, bottom: 20 };
titlePadding: any = { left: 90, top: 0, right: 0, bottom: 10 };
xAxis: any =
{
    dataField: 'DISPLAY_NAME',
    showGridLines: false,
    labels: {
      angle: -60,
      rotationPoint: 'topright',
      offset: { x: 0, y: -25 }
    },
    showTickMarks: false
};
seriesGroups: any[] =
[
  {
    type: 'column',
    useGradient: false,
    // columnsGapPercent: 20,
    // seriesGapPercent: 10,
    columnsMinWidth: 30,
    columnsMaxWidth: 30,
    valueAxis:
    {
      unitInterval: 1000000,
      minValue: Math.min.apply(null, this.sampleData.map(i => i.Total_Value_num)) - 1000000,
      maxValue: Math.min.apply(null, this.sampleData.map(i => i.Total_Value_num)) + 5000000,
      displayValueAxis: true,
      description: '',
      axisSize: 'auto',
      showTickMarks: false,
      formatFunction: this.convertToMillions,
      labels: {
        offset: { x: -5, y: 0 }
      }
    },
    series: [
      {
        dataField: 'Total_Value_num',
        displayText: 'Total_Value',
        formatFunction: (value) => this.convertToMillions(value, true),
        toolTipFormatFunction: (value, iIndex, sIndex, gIndex, xAxisValue) => {
          return '<div class="corp-name">' + this.findCorpFullName(xAxisValue) + '</div>' +
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

  findCorpFullName(corpName: string): string {
    return this.sampleData.find(data => data.DISPLAY_NAME === corpName).CX_CUSTOMER_NAME;
  }

}
