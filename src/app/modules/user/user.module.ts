import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserDetailDialogComponent } from './components/user-detail-dialog/user-detail-dialog.component';
import { UserRoutingModule } from './user-routing.module';
import { BaseModule } from 'src/app/shared/modules';
import { NzModalModule} from 'ng-zorro-antd/modal';
import { UserPasswordComponent } from './components/user-password/user-password.component';


@NgModule({
  declarations: [
    UserListComponent,
    UserDetailDialogComponent,
    UserPasswordComponent,
    
  ],
  imports: [
    CommonModule,
    BaseModule,
    UserRoutingModule,
    NzModalModule,
  ]
})
export class UserModule { }
