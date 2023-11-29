import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUser } from 'src/interfaces/user';
import { UserService } from '../../service/user.service';
import { DrawerService } from 'src/app/shared/services/drawer.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { UserDetailDialogComponent } from '../user-detail-dialog/user-detail-dialog.component';
import { NgxPermissionsService } from 'ngx-permissions';
import { PermissionService } from 'src/app/shared/services/permission.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  user$: Observable<IUser[]> = of([])

  constructor(
    private userScv: UserService,
    private drawerService: DrawerService,
    private breadcrumbService: BreadcrumbsService,
    private nzDrawerService: NzDrawerService,
    private permission: PermissionService,
    private permissionsService: NgxPermissionsService,
  ) {
    this.breadcrumbService.setBreadcrumbs([
      {header:'User List', label: 'User', url: 'user' }
    ])
  }

  ngOnInit(): void {
    this.user$ = this.userScv.user$   
    this.permission.getPermisssion().subscribe(permission => {
      this.permissionsService.loadPermissions(permission);
    })
  }

  openForCreate() {
    this.drawerService.openDrawer(
      UserDetailDialogComponent
    )
  }

  openDrawerForUpdate(user: IUser): void {
    this.permissionsService.hasPermission('user_update').then(hasPermission => {
      if (hasPermission && user.id) {
        this.nzDrawerService.create({
          nzContent: UserDetailDialogComponent,
          nzContentParams: { user },
        });
      }
    });
  }
}
