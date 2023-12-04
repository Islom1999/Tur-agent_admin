import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightDetailComponent } from './highlight-detail.component';

describe('HighlightDetailComponent', () => {
  let component: HighlightDetailComponent;
  let fixture: ComponentFixture<HighlightDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HighlightDetailComponent]
    });
    fixture = TestBed.createComponent(HighlightDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
