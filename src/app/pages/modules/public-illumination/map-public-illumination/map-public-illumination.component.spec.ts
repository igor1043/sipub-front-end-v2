import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapPublicIlluminationComponent } from './map-public-illumination.component';

describe('MapPublicIlluminationComponent', () => {
  let component: MapPublicIlluminationComponent;
  let fixture: ComponentFixture<MapPublicIlluminationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MapPublicIlluminationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapPublicIlluminationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
