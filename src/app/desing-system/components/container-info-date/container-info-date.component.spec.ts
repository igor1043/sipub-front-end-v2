/* tslint:disable:no-unused-variable */
import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ContainerInfoDateComponent } from './container-info-date.component';

describe('ContainerInfoDateComponent', () => {
  let component: ContainerInfoDateComponent;
  let fixture: ComponentFixture<ContainerInfoDateComponent>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerInfoDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
