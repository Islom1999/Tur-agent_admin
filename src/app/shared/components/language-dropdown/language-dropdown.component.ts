import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { TranslateLanguageService } from '../../services/translate.service';

@Component({
  selector: 'language-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-dropdown.component.html',
  styleUrls: ['./language-dropdown.component.scss']
})
export class LanguageDropdownComponent {
  private languageSubscription!: Subscription;
  currentLanguage: string = 'en';
  isEnglishSelected = true;
  isOpen = false;

  constructor(private languageService: TranslateLanguageService){}

  ngOnInit(): void {
    this.languageSubscription = this.languageService.currentLanguage.subscribe();
  }

  toggleLanguage(langCode:string) {
    this.useLanguage(langCode);
    this.isOpen = false;
  }

  useLanguage(language: string): void {
    this.currentLanguage = language;
    this.languageService.changeLanguage(language);
  }


  ngOnDestroy() {
    if (this.languageSubscription) {
      this.languageSubscription.unsubscribe();
    }
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as Element;
    if (target && !target.closest('.dropdown-menu')) {
      this.isOpen = false;
    }
  }
}
