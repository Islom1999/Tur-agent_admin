import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Subscription } from 'rxjs';
import { TranslateLanguageService } from '../../services/translate.service';
import { LangModule } from '../../modules';

@Component({
  selector: 'header-profile',
  standalone: true,
  imports: [CommonModule, LangModule],
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.scss']
})
export class HeaderProfileComponent {
  private langSub!: Subscription;
  isOpen = false;

  constructor(
    private authService: AuthService, 
    private languageService: TranslateLanguageService
  ){}

  logout(): void {
    this.authService.logout()
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  ngOnInit() {
    this.langSub = this.languageService.currentLanguage.subscribe();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const target = event.target as Element;
    if (target && !target.closest('.profile-dropdown-menu')) {
      this.isOpen = false;
    }
  }

  ngOnDestroy() {
    if (this.langSub) {
      this.langSub.unsubscribe();
    }
  }
}
