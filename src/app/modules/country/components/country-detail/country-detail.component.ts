import { Component } from '@angular/core';
import { ICountry } from 'src/interfaces';
import { CountryService } from '../../service/country.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent {
  permissionsTypes = Object.values(Permissions);
  country!: ICountry;
  form: FormGroup = new FormGroup({});
  isLoading$: boolean = false;

  listOfOption: string[] = [...this.permissionsTypes];
  listOfSelectedValue!:string[];

  constructor(
    private countryService: CountryService,
    private drawerRef: NzDrawerRef,
    private messageSvc: NzMessageService,
  ) { 
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name_en: new FormControl('', [Validators.required]),
      name_ru: new FormControl('', [Validators.required]),
      name_ne: new FormControl('', [Validators.required]),
      name_id: new FormControl('', [Validators.required]),
      description_en: new FormControl('', [Validators.required]),
      description_ru: new FormControl('', [Validators.required]),
      description_ne: new FormControl('', [Validators.required]),
      description_id: new FormControl('', [Validators.required]),
    });

    if (this.country) {
      this.isLoading$ = true; 
      this.countryService.getById(this.country.id as string).subscribe(data => {
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

    if (this.country && this.country.id) {
      this.updateCountry(this.country.id, data);
    } else {
      this.createCountry(data);
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
    } = this.form.getRawValue();
    return { 
      name_en, name_id, name_ne, name_ru,
      description_en, description_id, description_ne, description_ru
    };
  }

  private updateCountry(id: string, data: ICountry) {
    this.countryService.updateCountry(id, data).subscribe(updatedData => {
      if (updatedData) {
        this.messageSvc.success('Updated Successfully');
        this.drawerRef.close();
      }
    });
  }

  private createCountry(data: ICountry) {
    this.countryService.addCountry(data).subscribe(createdData => {
      if (createdData) {
        this.messageSvc.success('Created Successfully');
        this.drawerRef.close();
      }
    });
  }

  onDelete() {
    this.countryService.deleteCountry(this.country.id as string).subscribe(() => {
      this.messageSvc.success('Deleted Successfully')
      this.drawerRef.close()
    })
  }
}
