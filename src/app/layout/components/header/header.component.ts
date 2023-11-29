import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FullScreenService } from 'src/app/shared/services/full-screen.service';
import { SidenavService } from 'src/app/shared/services/sidenav.service';
import { TranslateLanguageService } from 'src/app/shared/services/translate.service';

@Component({
  selector: 'header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnDestroy {
  private langSub!: Subscription;

  constructor(
    private sidenavService: SidenavService,
    private fullscreenService: FullScreenService,
    private languageService: TranslateLanguageService
  ) { }

  ngOnInit() {
    this.langSub = this.languageService.currentLanguage.subscribe();
  }

  toggleOverlay() {
    this.sidenavService.toggle()
  }

  toggleFullscreen(): void {
    const currentState = this.fullscreenService.getFullscreen();
    this.fullscreenService.setFullscreen(!currentState);

    const docElm = document.documentElement as any;

    if (!currentState) {
      // To'liq ekran rejimini yoqish
      if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
      } else if (docElm.mozRequestFullScreen) { // Firefox
        docElm.mozRequestFullScreen();
      } else if (docElm.webkitRequestFullscreen) { // Chrome, Safari and Opera
        docElm.webkitRequestFullscreen();
      } else if (docElm.msRequestFullscreen) { // IE/Edge
        docElm.msRequestFullscreen();
      }
    } else {
      // To'liq ekran rejimidan chiqish
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).mozCancelFullScreen) { // Firefox
        (document as any).mozCancelFullScreen();
      } else if ((document as any).webkitExitFullscreen) { // Chrome, Safari and Opera
        (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) { // IE/Edge
        (document as any).msExitFullscreen();
      }
    }
  }

  toggleSidenav() {
    this.sidenavService.toggle();
  }

  ngOnDestroy() {
    if (this.langSub) {
      this.langSub.unsubscribe();
    }
  }
}
