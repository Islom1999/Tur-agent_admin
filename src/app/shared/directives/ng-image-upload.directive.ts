import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Directive({
  selector: '[NgUploadImage]',
  standalone: true,
})
export class UploadImageDirective {
  @Input() maxSize: number = 5242880; // 5MB in bytes
  @Output() imageUploaded = new EventEmitter<File>();

  constructor(private message:NzMessageService) { }

  @HostListener('change', ['$event.target.files']) handleImageUpload(files: FileList) {
    const file = files.item(0);
    if (!file) return;

    // Check file type
    const allowedTypes = ['image/png', 'image/jpeg', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      this.message.error('Invalid file type. Only PNG, JPEG and GIF images are allowed.')
      return;
    }

    // Check file size
    if (file.size > this.maxSize) {
      this.message.info('File size exceeds limit. Maximum allowed size is 5MB.')
      return;
    }

    // Emit event with file object
    this.imageUploaded.emit(file);
  }

}
