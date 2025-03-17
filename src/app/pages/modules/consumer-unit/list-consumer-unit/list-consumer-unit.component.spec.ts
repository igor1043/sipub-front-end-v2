import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListConsumerUnitComponent } from './list-consumer-unit.component';

describe('ListConsumerUnitComponent', () => {
  let component: ListConsumerUnitComponent;
  let fixture: ComponentFixture<ListConsumerUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListConsumerUnitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListConsumerUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
