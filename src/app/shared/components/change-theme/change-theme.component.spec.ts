import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeThemeComponent } from './change-theme.component';

describe('ChangeThemeComponent', () => {
  let component: ChangeThemeComponent;
  let fixture: ComponentFixture<ChangeThemeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ChangeThemeComponent]
    });
    fixture = TestBed.createComponent(ChangeThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
