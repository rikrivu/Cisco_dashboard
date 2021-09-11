import { Component, OnInit, Input } from '@angular/core';
import { ProductHierarchy } from '../../../Interfaces/productHierarchy';

@Component({
  selector: 'app-org-chart-node',
  templateUrl: './org-chart-node.component.html',
  styleUrls: ['./org-chart-node.component.scss']
})
export class OrgChartNodeComponent implements OnInit {

  @Input() productHierarchy: ProductHierarchy;

  constructor() { }

  ngOnInit() {
  }

}
