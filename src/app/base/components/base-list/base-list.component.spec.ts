import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseListComponent } from './base-list.component';

describe('BaseListComponent', () => {
  let component: BaseListComponent;
  let fixture: ComponentFixture<BaseListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BaseListComponent]
    });
    fixture = TestBed.createComponent(BaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
