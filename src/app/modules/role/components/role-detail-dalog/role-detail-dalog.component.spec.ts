import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleDetailDalogComponent } from './role-detail-dalog.component';

describe('RoleDetailDalogComponent', () => {
  let component: RoleDetailDalogComponent;
  let fixture: ComponentFixture<RoleDetailDalogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RoleDetailDalogComponent]
    });
    fixture = TestBed.createComponent(RoleDetailDalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
