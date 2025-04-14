/* tslint:disable:no-unused-variable */
import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AppDashboardLayoutComponent } from './dashboard-layout.component';

describe('AppDashboardLayoutComponent', () => {
  let component: AppDashboardLayoutComponent;
  let fixture: ComponentFixture<AppDashboardLayoutComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AppDashboardLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
