import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageCreateComponent } from './package-create.component';

describe('PackageCreateComponent', () => {
  let component: PackageCreateComponent;
  let fixture: ComponentFixture<PackageCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PackageCreateComponent]
    });
    fixture = TestBed.createComponent(PackageCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
