import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appImageDelete]',
  standalone: true,
})
export class ImageDeleteDirective {
  @Input() image!: string;
  constructor() { }

  @HostListener('click', ['$event'])
  deleteImage() {
    console.log(this.image);
    this.image = '';
  }
}
