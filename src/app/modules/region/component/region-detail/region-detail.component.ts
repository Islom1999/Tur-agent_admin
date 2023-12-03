import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICountry, IRegion } from 'src/interfaces';
import { RegionService } from '../../service/region.service';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, of } from 'rxjs';
import { CountryService } from 'src/app/modules/country/service/country.service';

@Component({
  selector: 'app-region-detail',
  templateUrl: './region-detail.component.html',
  styleUrls: ['./region-detail.component.scss']
})
export class RegionDetailComponent {
  permissionsTypes = Object.values(Permissions);
  region!: IRegion;
  form: FormGroup = new FormGroup({});
  isLoading$: boolean = false;
  country$: Observable<ICountry[]> = of([]);

  listOfOption: string[] = [...this.permissionsTypes];
  listOfSelectedValue!:string[];

  constructor(
    private regionService: RegionService,
    private drawerRef: NzDrawerRef,
    private countryService: CountryService,
    private messageSvc: NzMessageService,
  ) { 
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      country_id: new FormControl('', [Validators.required]),
      map: new FormControl('', [Validators.required]),
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

    if (this.region) {
      this.isLoading$ = true; 
      this.regionService.getById(this.region.id as string).subscribe(data => {
        this.form.patchValue(data)
        this.isLoading$ = false;
      })
    }
  }


  close() {
    this.drawerRef.close()
  }

  submitData() {
    if (this.isFormInvalid()) return;

    const data = this.prepareData();

    if (this.region && this.region.id) {
      this.updateRegion(this.region.id, data);
    } else {
      this.createRegion(data);
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
      country_id, map
    } = this.form.getRawValue();
    return { 
      name_en, name_id, name_ne, name_ru,
      description_en, description_id, description_ne, description_ru,
      country_id, map
    };
  }

  private updateRegion(id: string, data: IRegion) {
    this.regionService.updateRegion(id, data).subscribe(updatedData => {
      if (updatedData) {
        this.messageSvc.success('Updated Successfully');
        this.drawerRef.close();
      }
    });
  }

  private createRegion(data: IRegion) {
    this.regionService.addRegion(data).subscribe(createdData => {
      if (createdData) {
        this.messageSvc.success('Created Successfully');
        this.drawerRef.close();
      }
    });
  }

  onDelete() {
    this.regionService.deleteRegion(this.region.id as string).subscribe(() => {
      this.messageSvc.success('Deleted Successfully')
      this.drawerRef.close()
    })
  }
}
