import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchItemComponent } from './switch-item.component';

describe('SwitchComponent', () => {
  let component: SwitchItemComponent;
  let fixture: ComponentFixture<SwitchItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SwitchItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SwitchItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
