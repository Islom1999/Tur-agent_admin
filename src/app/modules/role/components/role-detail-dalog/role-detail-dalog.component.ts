import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { Observable, of, take } from 'rxjs';
import { IRole } from 'src/interfaces/role';
import { RoleService } from '../../service/role.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Permissions } from 'src/enumerations';

@Component({
  selector: 'app-role-detail-dalog',
  templateUrl: './role-detail-dalog.component.html',
  styleUrls: ['./role-detail-dalog.component.scss']
})
export class RoleDetailDalogComponent {
  permissionsTypes = Object.values(Permissions);
  role!: IRole;
  form: FormGroup = new FormGroup({});
  isLoading$: boolean = false;

  listOfOption: string[] = [...this.permissionsTypes];
  listOfSelectedValue!:string[];

  constructor(
    private roleService: RoleService,
    private drawerRef: NzDrawerRef,
    private messageSvc: NzMessageService,
  ) { 
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      permissions: new FormControl('', [Validators.required]),
    });

    if (this.role) {
      this.isLoading$ = true; 
      this.roleService.getById(this.role.id as string).subscribe(data => {
        this.form.patchValue(data)
        this.isLoading$ = false;
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

    if (this.role && this.role.id) {
      this.updateRole(this.role.id, data);
    } else {
      this.createRole(data);
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
    const { title, permissions } = this.form.getRawValue();
    return { title, permissions };
  }

  private updateRole(id: string, data: IRole) {
    this.roleService.updateRole(id, data).subscribe(updatedData => {
      if (updatedData) {
        this.messageSvc.success('Updated Successfully');
        this.drawerRef.close();
      }
    });
  }

  private createRole(data: IRole) {
    this.roleService.addRole(data).subscribe(createdData => {
      if (createdData) {
        this.messageSvc.success('Created Successfully');
        this.drawerRef.close();
      }
    });
  }

  onDelete() {
    this.roleService.deleteRole(this.role.id as string).subscribe(() => {
      this.messageSvc.success('Deleted Successfully')
      this.drawerRef.close()
    })
  }
}
