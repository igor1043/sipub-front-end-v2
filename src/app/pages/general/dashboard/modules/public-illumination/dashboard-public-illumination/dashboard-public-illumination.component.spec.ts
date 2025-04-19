import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DashboardPublicIlluminationComponent } from './dashboard-public-illumination.component';

describe('Dashboard_publicIlluminationComponent', () => {
  let component: DashboardPublicIlluminationComponent;
  let fixture: ComponentFixture<DashboardPublicIlluminationComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPublicIlluminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
