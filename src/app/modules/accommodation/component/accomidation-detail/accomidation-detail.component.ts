import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAccomidation, IRegion } from 'src/interfaces';
import { AccomidationService } from '../../service/accomidation.service';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, of } from 'rxjs';
import { RegionService } from 'src/app/modules/region/service/region.service';

@Component({
  selector: 'app-accomidation-detail',
  templateUrl: './accomidation-detail.component.html',
  styleUrls: ['./accomidation-detail.component.scss']
})
export class AccomidationDetailComponent {
  permissionsTypes = Object.values(Permissions);
  accomidation!: IAccomidation;
  form: FormGroup = new FormGroup({});
  isLoading$: boolean = false;
  package_id!: string
  region$: Observable<IRegion[]> = of([]);

  listOfOption: string[] = [...this.permissionsTypes];
  listOfSelectedValue!:string[];

  constructor(
    private accomidationService: AccomidationService,
    private drawerRef: NzDrawerRef,
    private messageSvc: NzMessageService,
    private regionSvc: RegionService,
  ) { 
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      night: new FormControl('', [Validators.required]),
      hotel_en: new FormControl('', [Validators.required]),
      hotel_ru: new FormControl('', [Validators.required]),
      hotel_ne: new FormControl('', [Validators.required]),
      hotel_id: new FormControl('', [Validators.required]),
      region_id: new FormControl('', [Validators.required]),
    });   
    if (this.accomidation) {
      this.isLoading$ = true; 
      this.accomidationService.getById(this.accomidation.id as string).subscribe(data => {
        this.form.patchValue(data)
        this.isLoading$ = false;
      })
    }
    this.region$ = this.regionSvc.region$
  }


  close() {
    this.drawerRef.close()
  }

  submitData() {
    if (this.isFormInvalid()) return;

    const data = this.prepareData();

    if (this.accomidation && this.accomidation.id) {
      this.updateAccomidation(this.accomidation.id, data);
    } else {
      this.createAccomidation(data);
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
      hotel_en, hotel_id, hotel_ne, hotel_ru, region_id,night
    } = this.form.getRawValue();
    return { 
      hotel_en, hotel_id, hotel_ne, hotel_ru, region_id,night,
      package_id: this.package_id
    };
  }

  private updateAccomidation(id: string, data: IAccomidation) {
    this.accomidationService.updateAccomidation(id, data).subscribe(updatedData => {
      if (updatedData) {
        this.messageSvc.success('Updated Successfully');
        this.drawerRef.close();
      }
    });
  }

  private createAccomidation(data: IAccomidation) {
    this.accomidationService.addAccomidation(data).subscribe(createdData => {
      if (createdData) {
        this.messageSvc.success('Created Successfully');
        this.drawerRef.close();
      }
    });
  }

  onDelete() {
    this.accomidationService.deleteAccomidation(this.accomidation.id as string).subscribe(() => {
      this.messageSvc.success('Deleted Successfully')
      this.drawerRef.close()
    })
  }
}
