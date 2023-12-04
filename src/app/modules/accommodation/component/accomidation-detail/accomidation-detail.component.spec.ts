import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomidationDetailComponent } from './accomidation-detail.component';

describe('AccomidationDetailComponent', () => {
  let component: AccomidationDetailComponent;
  let fixture: ComponentFixture<AccomidationDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccomidationDetailComponent]
    });
    fixture = TestBed.createComponent(AccomidationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
