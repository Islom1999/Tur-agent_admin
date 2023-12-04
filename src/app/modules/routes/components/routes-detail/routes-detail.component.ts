import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IRoutes } from 'src/interfaces/routes';
import { RoutesService } from '../../service/routes.service';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-routes-detail',
  templateUrl: './routes-detail.component.html',
  styleUrls: ['./routes-detail.component.scss']
})
export class RoutesDetailComponent {
  permissionsTypes = Object.values(Permissions);
  routes!: IRoutes;
  form: FormGroup = new FormGroup({});
  isLoading$: boolean = false;
  package_id!: string

  listOfOption: string[] = [...this.permissionsTypes];
  listOfSelectedValue!:string[];

  constructor(
    private routesService: RoutesService,
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
    if (this.routes) {
      this.isLoading$ = true; 
      this.routesService.getById(this.routes.id as string).subscribe(data => {
        this.form.patchValue(data)
        this.isLoading$ = false;
      })
    }
    console.log(this.package_id);
    
  }


  close() {
    this.drawerRef.close()
  }

  submitData() {
    if (this.isFormInvalid()) return;

    const data = this.prepareData();

    if (this.routes && this.routes.id) {
      this.updateRoutes(this.routes.id, data);
    } else {
      this.createRoutes(data);
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
      description_en, description_id, description_ne, description_ru, 
      package_id: this.package_id
    };
  }

  private updateRoutes(id: string, data: IRoutes) {
    this.routesService.updateRoutes(id, data).subscribe(updatedData => {
      if (updatedData) {
        this.messageSvc.success('Updated Successfully');
        this.drawerRef.close();
      }
    });
  }

  private createRoutes(data: IRoutes) {
    this.routesService.addRoutes(data).subscribe(createdData => {
      if (createdData) {
        this.messageSvc.success('Created Successfully');
        this.drawerRef.close();
      }
    });
  }

  onDelete() {
    this.routesService.deleteRoutes(this.routes.id as string).subscribe(() => {
      this.messageSvc.success('Deleted Successfully')
      this.drawerRef.close()
    })
  }
}
