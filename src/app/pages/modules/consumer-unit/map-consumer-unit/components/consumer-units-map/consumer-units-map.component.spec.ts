/* tslint:disable:no-unused-variable */
import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ConsumerUnitsMapComponent } from './consumer-units-map.component';

describe('ConsumerUnitsMapComponent', () => {
  let component: ConsumerUnitsMapComponent;
  let fixture: ComponentFixture<ConsumerUnitsMapComponent>;


  beforeEach(() => {
    fixture = TestBed.createComponent(ConsumerUnitsMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
