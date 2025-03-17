import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateConsumerUnitComponent } from './create-consumer-unit.component';

describe('CreateConsumerUnitComponent', () => {
  let component: CreateConsumerUnitComponent;
  let fixture: ComponentFixture<CreateConsumerUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateConsumerUnitComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateConsumerUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
