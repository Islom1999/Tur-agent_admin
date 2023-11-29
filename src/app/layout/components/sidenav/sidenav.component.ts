import { Component, OnDestroy, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { SidenavService } from 'src/app/shared/services/sidenav.service';
import { SIDENAV_MENU } from 'src/constants/sidenav-menu';
import { Subscription } from 'rxjs';
import { TranslateLanguageService } from 'src/app/shared/services/translate.service';

@Component({
  selector: 'sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('collapsed => expanded', [
        animate('300ms ease-in-out')
      ]),
      transition('expanded => collapsed', [
        animate('300ms ease-in-out')
      ])
    ])
  ]
})
export class SidenavComponent implements OnInit, OnDestroy {
  private sub!: Subscription;
  isOpen: boolean = false;
  menus = SIDENAV_MENU
  private langSub!: Subscription;

  constructor(
    private sidenavService: SidenavService,
    private languageService: TranslateLanguageService
  ) {}

  toggleMenu(menu: any, event: Event) {
    event.preventDefault();
    if (menu.state === 'expanded') {
      menu.state = 'collapsed';
    } else {
      this.menus.forEach(m => m.state = 'collapsed');
      menu.state = 'expanded';
    }
  }

  ngOnInit() {
    this.sub = this.sidenavService.getState().subscribe(isOpen => {
      this.isOpen = isOpen;
    });

    this.langSub = this.languageService.currentLanguage.subscribe();

  }

  toggleOverlay() {
    this.sidenavService.toggle()
  }

  ngOnDestroy() {
    this.sub.unsubscribe();

    if (this.langSub) {
      this.langSub.unsubscribe();
    }
  }
}
