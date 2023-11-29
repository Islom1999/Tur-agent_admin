import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FullScreenService {

  private isFullscreen: boolean = false;

  setFullscreen(value: boolean): void {
    this.isFullscreen = value;
  }

  getFullscreen(): boolean {
    return this.isFullscreen;
  }
}
