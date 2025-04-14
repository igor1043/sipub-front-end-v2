/* tslint:disable:no-unused-variable */
import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ApexChartComponent } from './apex-chart.component';

describe('ApexChartComponent', () => {
  let component: ApexChartComponent;
  let fixture: ComponentFixture<ApexChartComponent>;



  beforeEach(() => {
    fixture = TestBed.createComponent(ApexChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
