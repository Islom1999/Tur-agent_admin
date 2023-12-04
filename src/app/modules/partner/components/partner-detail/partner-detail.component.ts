import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPartner } from 'src/interfaces';
import { PartnerService } from '../../service/partner.service';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ImageService } from 'src/app/shared/services/image.service';

@Component({
  selector: 'app-partner-detail',
  templateUrl: './partner-detail.component.html',
  styleUrls: ['./partner-detail.component.scss']
})
export class PartnerDetailComponent {
  permissionsTypes = Object.values(Permissions);
  partner!: IPartner;
  form: FormGroup = new FormGroup({});
  isLoading$: boolean = false;
  imagePreview: string = '';
  @Output() changeImage: EventEmitter<string> = new EventEmitter();
  @Input() image: string = '';
  isImageLoading: boolean = false;
  isDisabled!: boolean;

  listOfOption: string[] = [...this.permissionsTypes];
  listOfSelectedValue!:string[];

  constructor(
    private partnerService: PartnerService,
    private drawerRef: NzDrawerRef,
    private messageSvc: NzMessageService,
    private imageSvc: ImageService,
  ) { 
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name_en: new FormControl('', [Validators.required]),
      name_ru: new FormControl('', [Validators.required]),
      name_ne: new FormControl('', [Validators.required]),
      name_id: new FormControl('', [Validators.required]),
    });

    if (this.partner) {
      this.isLoading$ = true; 
      this.partnerService.getById(this.partner.id as string).subscribe(data => {
        this.form.patchValue(data)
        this.isLoading$ = false;
        if (data.image) {
          this.image = this.imageSvc.getImageUrl(data.image);
        }
      })
    }

    // const children: string[] = [];
    // for (let i = 10; i < 36; i++) {
    //   children.push(`${i.toString(36)}${i}`);
    // }
    // this.listOfOption = children;
  }


  close() {
    this.drawerRef.close()
  }

  submitData() {
    if (this.isFormInvalid()) return;

    const data = this.prepareData();

    if (this.partner && this.partner.id) {
      this.updatePartner(this.partner.id, data);
    } else {
      this.createPartner(data);
    }
  }

  private isFormInvalid(): boolean {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(control => {
        control.markAsDirty();
        control.updateValueAndValidity();
      });
      return true;
    }
    return false;
  }

  private prepareData(): any {
    const { 
      name_en, name_id, name_ne, name_ru,
    } = this.form.getRawValue();
    const image = this.imageSvc.removeBaseUrl(this.image);
    return { 
      name_en, name_id, name_ne, name_ru, image
    };
  }

  private updatePartner(id: string, data: IPartner) {
    this.partnerService.updatePartner(id, data).subscribe(updatedData => {
      if (updatedData) {
        this.messageSvc.success('Updated Successfully');
        this.drawerRef.close();
      }
    });
  }

  private createPartner(data: IPartner) {
    this.partnerService.addPartner(data).subscribe(createdData => {
      if (createdData) {
        this.messageSvc.success('Created Successfully');
        this.drawerRef.close();
      }
    });
  }

  onDelete() {
    this.partnerService.deletePartner(this.partner.id as string).subscribe(() => {
      this.messageSvc.success('Deleted Successfully')
      this.drawerRef.close()
    })
  }

  // image functionality
  handleImageUpload(imageFile: File) {
    this.showPreview(imageFile);
    this.isImageLoading = true;
    this.imageSvc.uploadImage(imageFile).subscribe((res) => {
      this.image = res['url'];
      this.changeImage.emit(this.image);
      this.imagePreview = '';
      this.isImageLoading = false;
    });
  }

  showPreview(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  removeImage() {
    this.image = '';
    this.changeImage.emit(this.image);
  }
}
