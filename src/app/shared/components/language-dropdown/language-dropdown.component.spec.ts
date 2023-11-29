import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageDropdownComponent } from './language-dropdown.component';

describe('LanguageDropdownComponent', () => {
  let component: LanguageDropdownComponent;
  let fixture: ComponentFixture<LanguageDropdownComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [LanguageDropdownComponent]
    });
    fixture = TestBed.createComponent(LanguageDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
