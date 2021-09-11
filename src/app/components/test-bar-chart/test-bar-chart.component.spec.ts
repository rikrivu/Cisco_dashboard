import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestBarChartComponent } from './test-bar-chart.component';

describe('TestBarChartComponent', () => {
  let component: TestBarChartComponent;
  let fixture: ComponentFixture<TestBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
