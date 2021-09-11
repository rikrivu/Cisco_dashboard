import { Component, OnInit, Input } from '@angular/core';
import { ProductHierarchy } from '../../Interfaces/productHierarchy';

@Component({
  selector: 'app-org-chart',
  templateUrl: './org-chart.component.html',
  styleUrls: ['./org-chart.component.scss']
})
export class OrgChartComponent implements OnInit {

  @Input() productHierarchy: ProductHierarchy;

  constructor() { }

  ngOnInit() {
  }

}
