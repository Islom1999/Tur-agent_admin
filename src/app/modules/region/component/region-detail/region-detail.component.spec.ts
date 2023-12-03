import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionDetailComponent } from './region-detail.component';

describe('RegionDetailComponent', () => {
  let component: RegionDetailComponent;
  let fixture: ComponentFixture<RegionDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegionDetailComponent]
    });
    fixture = TestBed.createComponent(RegionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
