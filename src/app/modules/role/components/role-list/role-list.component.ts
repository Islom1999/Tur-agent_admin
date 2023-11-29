import { Component } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { Observable, of } from 'rxjs';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { DrawerService } from 'src/app/shared/services/drawer.service';
import { RoleDetailDalogComponent } from '../role-detail-dalog/role-detail-dalog.component';
import { IRole } from 'src/interfaces/role';
import { RoleService } from '../../service/role.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { PermissionService } from 'src/app/shared/services/permission.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})
export class RoleListComponent {
  roles$: Observable<IRole[]> = of([])

  constructor(
    private roleScv: RoleService,
    private permission : PermissionService,
    private drawerService: DrawerService,
    private breadcrumbService: BreadcrumbsService,
    private nzDrawerService: NzDrawerService,
    private permissionsService: NgxPermissionsService
  ) {
    this.breadcrumbService.setBreadcrumbs([
      {header:'Role List', label: 'Role', url: 'role' }
    ])
  }

  ngOnInit(): void {
    this.roles$ = this.roleScv.role$   
    this.permission.getPermisssion().subscribe(permission => {
      this.permissionsService.loadPermissions(permission);
    }) 
  }

  openForCreate() {
    this.drawerService.openDrawer(
      RoleDetailDalogComponent
    )
  }

  openDrawerForUpdate(role: IRole): void {
    this.permissionsService.hasPermission('role_update').then(hasPermission => {
      if (hasPermission && role.id) {
        this.nzDrawerService.create({
          nzContent: RoleDetailDalogComponent,
          nzContentParams: { role }
        })
      }
    });
  }
}
