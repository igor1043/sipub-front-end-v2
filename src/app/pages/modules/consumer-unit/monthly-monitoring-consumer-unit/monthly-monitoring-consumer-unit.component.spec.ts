import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthlyMonitoringConsumerUnitComponent } from './monthly-monitoring-consumer-unit.component';

describe('MonthlyMonitoringConsumerUnitComponent', () => {
  let component: MonthlyMonitoringConsumerUnitComponent;
  let fixture: ComponentFixture<MonthlyMonitoringConsumerUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthlyMonitoringConsumerUnitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthlyMonitoringConsumerUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
