import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HighlightListComponent } from './highlight-list.component';

describe('HighlightListComponent', () => {
  let component: HighlightListComponent;
  let fixture: ComponentFixture<HighlightListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HighlightListComponent]
    });
    fixture = TestBed.createComponent(HighlightListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
