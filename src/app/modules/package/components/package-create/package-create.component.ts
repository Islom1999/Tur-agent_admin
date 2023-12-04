import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Observable, of } from 'rxjs';
import { ICountry, IPackage } from 'src/interfaces';
import { PackageService } from '../../service/package.service';
import { CountryService } from 'src/app/modules/country/service/country.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/shared/services/image.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-package-create',
  templateUrl: './package-create.component.html',
  styleUrls: ['./package-create.component.scss']
})
export class PackageCreateComponent {
  permissionsTypes = Object.values(Permissions);
  packege!: IPackage;
  form: FormGroup = new FormGroup({});
  isLoading$: boolean = false;
  country$: Observable<ICountry[]> = of([]);
  imageSrc!: string;
  images: string[] = [];
  listOfOption: string[] = [...this.permissionsTypes];
  listOfSelectedValue!:string[];
  Editor = ClassicEditor;
  imgLoading = false
  
  get id() {
    return this.route.snapshot.params['id']
  }

  constructor(
    private packegeService: PackageService,
    private countryService: CountryService,
    private messageSvc: NzMessageService,
    private route: ActivatedRoute,
    private router: Router,
    private imageSvc: ImageService,
  ) { 
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      country_id: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),

      name_en: new FormControl('', [Validators.required]),
      name_ru: new FormControl('', [Validators.required]),
      name_ne: new FormControl('', [Validators.required]),
      name_id: new FormControl('', [Validators.required]),

      description_en: new FormControl('', [Validators.required]),
      description_ru: new FormControl('', [Validators.required]),
      description_ne: new FormControl('', [Validators.required]),
      description_id: new FormControl('', [Validators.required]),

      notes_en: new FormControl('', [Validators.required]),
      notes_ru: new FormControl('', [Validators.required]),
      notes_ne: new FormControl('', [Validators.required]),
      notes_id: new FormControl('', [Validators.required]),

      price_en: new FormControl('', [Validators.required]),
      price_ru: new FormControl('', [Validators.required]),
      price_ne: new FormControl('', [Validators.required]),
      price_id: new FormControl('', [Validators.required]),

      duration_en: new FormControl('', [Validators.required]),
      duration_ru: new FormControl('', [Validators.required]),
      duration_ne: new FormControl('', [Validators.required]),
      duration_id: new FormControl('', [Validators.required]),
    });

    this.country$ = this.countryService.country$

    // if (this.packege) {
    //   this.isLoading$ = true; 
    //   this.packegeService.getById(this.packege.id as string).subscribe(data => {
    //     this.form.patchValue(data)
    //     this.isLoading$ = false;
    //   })
    // }

    if (this.id) {
      // this.isEdit = true;
      this.isLoading$ = true;
      // this.enableFormControls();
      this.packegeService.getById(this.id as string).subscribe(data => {
        this.packege = data
        this.form.patchValue(data)
        this.isLoading$ = false;
        if (data.images && data.images.length) {
          this.images = data.images.map(img => this.imageSvc.getImageUrl(img));
        }
      })

    }
  }


  submitData() {
    if (this.isFormInvalid()) return;

    const data = this.prepareData();

    if (this.packege && this.packege.id) {
      this.updatePackage(this.packege.id, data);
      this.cancel()
    } else {
      this.createPackage(data);
      this.cancel()
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
      description_en, description_id, description_ne, description_ru,
      notes_en, notes_id, notes_ne, notes_ru,
      price_en, price_id, price_ne, price_ru,
      duration_en, duration_id, duration_ne, duration_ru,
      country_id, type
    } = this.form.getRawValue();
    const images = this.images.map((image) => this.imageSvc.removeBaseUrl(image));
    return { 
      name_en, name_id, name_ne, name_ru,
      description_en, description_id, description_ne, description_ru,
      notes_en, notes_id, notes_ne, notes_ru,
      price_en, price_id, price_ne, price_ru,
      duration_en, duration_id, duration_ne, duration_ru,
      country_id, type, images
    };
  }

  private updatePackage(id: string, data: IPackage) {
    this.packegeService.updatePackage(id, data).subscribe(updatedData => {
      if (updatedData) {
        this.messageSvc.success('Updated Successfully');
        // this.drawerRef.close();
      }
    });
  }

  private createPackage(data: IPackage) {
    this.packegeService.addPackage(data).subscribe(createdData => {
      if (createdData) {
        this.messageSvc.success('Created Successfully');
        // this.drawerRef.close();
      }
    });
  }

  cancel() {
    this.router.navigate(['/package'], { relativeTo: this.route });
    this.form.reset()
    // this.images = []
  }

  // --------------------------------------------------------------------
  // image methods
  getImages(data: any): void {
    this.images = data.images.map((img: string) => {
      this.imageSvc.getImageUrl(img)
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.images, event.previousIndex, event.currentIndex);
  }

  dragOver(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.handleFileSelectFromDrop(files);
    }
  }

  handleFileSelectFromDrop(files: FileList) {
    for (let i = 0; i < files.length; i++) {
      const file = files.item(i);
      if (file) {
        this.handleImageUpload(file);
      }
    }
  }

  dragLeave(event: DragEvent) {
    event.stopPropagation();
    event.preventDefault();
  }

  handleImageUpload(imageFile: File) {
    const maxFileSize = 5 * 1024 * 1024; // 5MB ni baytlarga aylantirish
    if (imageFile.size > maxFileSize) {
      this.messageSvc.info("Image size must be less than 5MB!");
      return;
    }
    const validFormats = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!validFormats.includes(imageFile.type)) {
      this.messageSvc.info('Only images in png, jpg, jpeg format can be uploaded!');
      return;
    }
    this.imgLoading = true
    this.showPreview(imageFile);
    this.imageSvc.uploadImage(imageFile).subscribe((res) => {
      this.images.push(res.url);
      this.imageSrc = '';
      this.imgLoading = false
    });
  }

  handleFileSelect(event: any) {
    const files: FileList = event.target.files;
    if (files) {
      const maxAllowed = 5;
      const totalImages = this.images.length + files.length;

      // Faqatgina 5 ta rasmni yuklash imkoni bo'lsa yuklash
      if (totalImages <= maxAllowed) {
        for (let i = 0; i < files.length; i++) {
          const file: File = files[i];
          this.handleImageUpload(file);
        }
      } else {
        this.messageSvc.info(`Siz faqatgina ${maxAllowed} ta rasmni yuklashingiz mumkin.`)
      }
    }
  }

  showPreview(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      this.imageSrc = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  removeImage(index: number) {
    this.images.splice(index, 1);
  }
}
