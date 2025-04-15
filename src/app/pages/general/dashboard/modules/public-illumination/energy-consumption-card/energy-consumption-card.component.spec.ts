/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EnergyConsumptionCardComponent } from './energy-consumption-card.component';

describe('EnergyConsumptionCardComponent', () => {
  let component: EnergyConsumptionCardComponent;
  let fixture: ComponentFixture<EnergyConsumptionCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnergyConsumptionCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnergyConsumptionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
