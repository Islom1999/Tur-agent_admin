import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private isOpen = new BehaviorSubject<boolean>(false);

  toggle(): void {
    this.isOpen.next(!this.isOpen.value);
  }

  getState(): BehaviorSubject<boolean> {
    return this.isOpen;
  }

}
