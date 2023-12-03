import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IRegion } from 'src/interfaces';
import { RegionService } from '../../service/region.service';
import { PermissionService } from 'src/app/shared/services/permission.service';
import { DrawerService } from 'src/app/shared/services/drawer.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NgxPermissionsService } from 'ngx-permissions';
import { RegionDetailComponent } from '../region-detail/region-detail.component';

@Component({
  selector: 'app-region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.scss']
})
export class RegionListComponent {
  regions$: Observable<IRegion[]> = of([])

  constructor(
    private regionScv: RegionService,
    private permission : PermissionService,
    private drawerService: DrawerService,
    private breadcrumbService: BreadcrumbsService,
    private nzDrawerService: NzDrawerService,
    private permissionsService: NgxPermissionsService
  ) {
    this.breadcrumbService.setBreadcrumbs([
      {header:'Role List', label: 'Role', url: 'region' }
    ])
  }

  ngOnInit(): void {
    this.regions$ = this.regionScv.region$   
    this.permission.getPermisssion().subscribe(permission => {
      this.permissionsService.loadPermissions(permission);
    }) 
  }

  openForCreate() {
    this.drawerService.openDrawer(
      RegionDetailComponent
    )
  }

  openDrawerForUpdate(region: IRegion): void {
    this.nzDrawerService.create({
      nzContent: RegionDetailComponent,
      nzContentParams: { region }
    })
    this.permissionsService.hasPermission('region_update').then(hasPermission => {
      if (hasPermission && region.id) {
      }
    });
  }
}
