import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Observable, of } from 'rxjs';
import { ICountry, IPlanning } from 'src/interfaces';
import { PlanningService } from '../../service/planning.service';
import { CountryService } from 'src/app/modules/country/service/country.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';
import { ImageService } from 'src/app/shared/services/image.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-planning-detail',
  templateUrl: './planning-detail.component.html',
  styleUrls: ['./planning-detail.component.scss']
})
export class PlanningDetailComponent {
  permissionsTypes = Object.values(Permissions);
  planning!: IPlanning;
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
    private planningService: PlanningService,
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
      name_en: new FormControl('', [Validators.required]),
      name_ru: new FormControl('', [Validators.required]),
      name_ne: new FormControl('', [Validators.required]),
      name_id: new FormControl('', [Validators.required]),
      description_en: new FormControl('', [Validators.required]),
      description_ru: new FormControl('', [Validators.required]),
      description_ne: new FormControl('', [Validators.required]),
      description_id: new FormControl('', [Validators.required]),
    });

    this.country$ = this.countryService.country$

    // if (this.planning) {
    //   this.isLoading$ = true; 
    //   this.planningService.getById(this.planning.id as string).subscribe(data => {
    //     this.form.patchValue(data)
    //     this.isLoading$ = false;
    //   })
    // }

    if (this.id) {
      // this.isEdit = true;
      this.isLoading$ = true;
      // this.enableFormControls();
      this.planningService.getById(this.id as string).subscribe(data => {
        this.planning = data
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

    if (this.planning && this.planning.id) {
      this.updatePlanning(this.planning.id, data);
      this.cancel()
    } else {
      this.createPlanning(data);
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
      country_id,
    } = this.form.getRawValue();
    const images = this.images.map((image) => this.imageSvc.removeBaseUrl(image));
    return { 
      name_en, name_id, name_ne, name_ru,
      description_en, description_id, description_ne, description_ru,
      country_id, images
    };
  }

  private updatePlanning(id: string, data: IPlanning) {
    this.planningService.updatePlanning(id, data).subscribe(updatedData => {
      if (updatedData) {
        this.messageSvc.success('Updated Successfully');
        // this.drawerRef.close();
      }
    });
  }

  private createPlanning(data: IPlanning) {
    this.planningService.addPlanning(data).subscribe(createdData => {
      if (createdData) {
        this.messageSvc.success('Created Successfully');
        // this.drawerRef.close();
      }
    });
  }

  cancel() {
    this.router.navigate(['/planning'], { relativeTo: this.route });
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
