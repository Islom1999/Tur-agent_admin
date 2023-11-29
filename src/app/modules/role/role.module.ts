import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleListComponent } from './components/role-list/role-list.component';
import { RoleDetailDalogComponent } from './components/role-detail-dalog/role-detail-dalog.component';
import { BaseModule } from 'src/app/shared/modules';
import { RoleRoutingModule } from './role-routing.module';



@NgModule({
  declarations: [
    RoleListComponent,
    RoleDetailDalogComponent
  ],
  imports: [
    CommonModule,
    RoleRoutingModule,
    BaseModule
  ]
})
export class RoleModule { }
