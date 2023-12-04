import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerDetailComponent } from './partner-detail.component';

describe('PartnerDetailComponent', () => {
  let component: PartnerDetailComponent;
  let fixture: ComponentFixture<PartnerDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartnerDetailComponent]
    });
    fixture = TestBed.createComponent(PartnerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
