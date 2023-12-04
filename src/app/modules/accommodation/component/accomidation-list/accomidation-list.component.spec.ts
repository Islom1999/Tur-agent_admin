import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccomidationListComponent } from './accomidation-list.component';

describe('AccomidationListComponent', () => {
  let component: AccomidationListComponent;
  let fixture: ComponentFixture<AccomidationListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccomidationListComponent]
    });
    fixture = TestBed.createComponent(AccomidationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
