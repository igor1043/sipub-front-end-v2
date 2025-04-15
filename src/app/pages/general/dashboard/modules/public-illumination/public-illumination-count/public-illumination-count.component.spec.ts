/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PublicIlluminationCountComponent } from './public-illumination-count.component';

describe('PublicIlluminationCountComponent', () => {
  let component: PublicIlluminationCountComponent;
  let fixture: ComponentFixture<PublicIlluminationCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicIlluminationCountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicIlluminationCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
