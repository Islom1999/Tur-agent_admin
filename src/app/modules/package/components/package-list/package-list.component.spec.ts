import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageListComponent } from './package-list.component';

describe('PackageListComponent', () => {
  let component: PackageListComponent;
  let fixture: ComponentFixture<PackageListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PackageListComponent]
    });
    fixture = TestBed.createComponent(PackageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
