import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateLanguageService {

  private languageSource = new BehaviorSubject<string>(this.getSavedLanguage() || 'en');
  currentLanguage = this.languageSource.asObservable();

  constructor(private translate: TranslateService) {
    this.setInitialLanguage(this.languageSource.value);
  }

  private getSavedLanguage(): string | null {
    return localStorage.getItem('language');
  }

  setInitialLanguage(language: string) {
    this.translate.setDefaultLang(language);
    this.translate.use(language);
    localStorage.setItem('language', language);
  }

  changeLanguage(language: string): void {
    this.translate.use(language);
    this.languageSource.next(language);
    localStorage.setItem('language', language);
  }
}
