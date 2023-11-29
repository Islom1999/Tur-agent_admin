import { Component, Inject, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { UserService } from '../../service/user.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IPassword } from 'src/interfaces/user';

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.scss']
})
export class UserPasswordComponent {
  @Input() id!: string;
  user!: IPassword;
  form: FormGroup = new FormGroup({});

  constructor(
    private modal: NzModalRef,
    private userService: UserService,
    private messageSvc: NzMessageService,
    @Inject(NZ_MODAL_DATA) public data: {id:string}
    ) {
    this.form = new FormGroup({
      password: new FormControl('', [Validators.required]),
      passwordRepeat: new FormControl('', [Validators.required]),
    })
    this.id = data.id;
  }

  destroyModal(): void {
    this.modal.destroy();
  }

  submitData() {
    if (this.isFormInvalid()) return;
    const data = this.prepareData();

    console.log(data, this.id, this.user);

    if(data.passwordRepeat !== data.password) return;

    if (this.id) {
      this.updateUser(this.id, data);
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
    const { password, passwordRepeat } = this.form.getRawValue();
    return { password, passwordRepeat};
  }

  private updateUser(id: string, data: IPassword) {
    this.userService.updateUserPassword(id, {password: data.password}).subscribe(updatedData => {
      if (updatedData) {
        this.messageSvc.success('Updated Successfully');
        this.modal.destroy();
      }
    });
  }
}
