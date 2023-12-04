import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerListComponent } from './partner-list.component';

describe('PartnerListComponent', () => {
  let component: PartnerListComponent;
  let fixture: ComponentFixture<PartnerListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PartnerListComponent]
    });
    fixture = TestBed.createComponent(PartnerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
