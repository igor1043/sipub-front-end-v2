import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleTableComponent } from './simple-table.component';

describe('SimpleTableComponent', () => {
  let component: SimpleTableComponent<any>;
  let fixture: ComponentFixture<SimpleTableComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimpleTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimpleTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
