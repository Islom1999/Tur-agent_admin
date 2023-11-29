import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IUser, IUserCreate, IUserRole } from 'src/interfaces/user';
import { UserService } from '../../service/user.service';
import { Observable, of, take } from 'rxjs';
import { RoleService } from 'src/app/modules/role/service/role.service';
import { IRole } from 'src/interfaces/role';
import { NzModalService } from 'ng-zorro-antd/modal';
import { UserPasswordComponent } from '../user-password/user-password.component';

@Component({
  selector: 'app-user-detail-dialog',
  templateUrl: './user-detail-dialog.component.html',
  styleUrls: ['./user-detail-dialog.component.scss']
})
export class UserDetailDialogComponent {
  user!: IUser;
  roles$: Observable<IRole[]> = of([]);

  form: FormGroup = new FormGroup({});
  isLoading$: boolean = false;

  isVisible = false;
  isConfirmLoading = false;
  
  constructor(
    private userService: UserService,
    private roleService: RoleService,
    private drawerRef: NzDrawerRef,
    private messageSvc: NzMessageService,
    private modalService: NzModalService,
  ) { 
    console.log(this.user);
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl(''),
      role_id: new FormControl('', [Validators.required]),
      isBlock: new FormControl('', [Validators.required]),
    });
    this.roles$ = this.roleService.role$

    if(this.user){
      const nameControl = this.form.get('name');
      const emailControl = this.form.get('email');
      nameControl?.disable()
      emailControl?.disable()
    }

    if (this.user) {
      this.isLoading$ = true; 
      this.userService.getById(this.user.id as string).subscribe((data) => {
        if (data) {
          this.roles$.pipe(take(1)).subscribe(subParts => {
            data.role = subParts.find(cm => cm.id === data.role_id.toString())
            this.form.patchValue(data)
            this.isLoading$ = false;
          })
        }
      })
    }
  }


  close() {
    this.drawerRef.close()
  }

  submitData() {
    if (this.isFormInvalid()) return;
    const data = this.prepareData();
    const dataUser = this.prepareDataUser();

    if (this.user && this.user.id) {
      this.updateUser(this.user.id, data);
    }else{
      this.createUser(dataUser);
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
    const { role_id, isBlock } = this.form.getRawValue();
    return { role_id, isBlock };
  }

  private prepareDataUser(): any {
    const { name, email, password, role_id, isBlock } = this.form.getRawValue();
    return { name, email, password, role_id, isBlock };
  }

  private createUser(data: IUserCreate) {
    this.userService.createUser(data).subscribe(createdData => {
      if (createdData) {
        this.messageSvc.success('Created Successfully');
        this.drawerRef.close();
      }
    });
  }


  private updateUser(id: string, data: IUserRole) {
    this.userService.updateUserRole(id, data).subscribe(updatedData => {
      if (updatedData) {
        this.messageSvc.success('Updated Successfully');
        this.drawerRef.close();
      }
    });
  }

  showModal(): void {
    this.modalService.create({
      nzTitle: 'Modal Title',
      nzContent: UserPasswordComponent,
      nzData: { id: this.user.id  }
    });
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 3000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  
}
