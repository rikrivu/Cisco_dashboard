import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgChartNodeComponent } from './org-chart-node.component';

describe('OrgChartNodeComponent', () => {
  let component: OrgChartNodeComponent;
  let fixture: ComponentFixture<OrgChartNodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgChartNodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgChartNodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
