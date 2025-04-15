/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LuminousPointCountComponent } from './luminous-point-count.component';

describe('LuminousPointCountComponent', () => {
  let component: LuminousPointCountComponent;
  let fixture: ComponentFixture<LuminousPointCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LuminousPointCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LuminousPointCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
