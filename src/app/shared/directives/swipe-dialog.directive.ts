import {
  Directive,
  EventEmitter,
  HostBinding,
  Input,
  OnInit,
  AfterViewInit,
  Renderer2,
  OnDestroy,
} from '@angular/core';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[ngSwipeDialog]',
  standalone: true,
})
export class SwipeDialogDirective implements OnInit, AfterViewInit, OnDestroy {
  @Input() openEvent!: EventEmitter<void>;
  private _isOpen = true;
  private overlay!: HTMLElement;
  private subscription: Subscription = new Subscription();

  @HostBinding('class.dialog_enter') get isOpen() {
    return this._isOpen;
  }
  @HostBinding('class.dialog_exit') get isClose() {
    return !this._isOpen;
  }

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.subscription.add(
      this.openEvent.subscribe(() => {
        this._isOpen = false;
        this.renderer.addClass(this.overlay, 'overlay_exit');
      })
    );
  }

  ngAfterViewInit(): void {
    this.overlay = this.renderer.selectRootElement('.overlay', true);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
