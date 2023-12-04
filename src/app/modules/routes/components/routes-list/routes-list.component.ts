import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IRoutes } from 'src/interfaces/routes';
import { RoutesService } from '../../service/routes.service';
import { PermissionService } from 'src/app/shared/services/permission.service';
import { DrawerService } from 'src/app/shared/services/drawer.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NgxPermissionsService } from 'ngx-permissions';
import { RoutesDetailComponent } from '../routes-detail/routes-detail.component';
import { ActivatedRoute, Router } from '@angular/router';
import { IPackage } from 'src/interfaces';
import { PackageService } from 'src/app/modules/package/service/package.service';

@Component({
  selector: 'app-routes-list',
  templateUrl: './routes-list.component.html',
  styleUrls: ['./routes-list.component.scss']
})
export class RoutesListComponent {
  routess$: Observable<IRoutes[]> = of([])
  // package!: IPackage

  constructor(
    private routesScv: RoutesService,
    // private packageScv: PackageService,
    private permission : PermissionService,
    private drawerService: DrawerService,
    private breadcrumbService: BreadcrumbsService,
    private nzDrawerService: NzDrawerService,
    private permissionsService: NgxPermissionsService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.breadcrumbService.setBreadcrumbs([
      {header:'Routes List', label: 'Package', url: 'package' }
    ])
  }

  get package_id() {
    return this.route.snapshot.params['id']
  }

  ngOnInit(): void {
    // this.routess$ = this.routesScv.routes$ 
    this.routesScv.loadRoutess(this.package_id);
    this.routess$ = this.routesScv.routes$;

    this.permission.getPermisssion().subscribe(permission => {
      this.permissionsService.loadPermissions(permission);
    }) 
  }

  openForCreate() {
    this.nzDrawerService.create({
      nzContent: RoutesDetailComponent,
      nzContentParams: { package_id:this.package_id }
    })
  }

  openDrawerForUpdate(routes: IRoutes): void {
    this.nzDrawerService.create({
      nzContent: RoutesDetailComponent,
      nzContentParams: { routes, package_id:this.package_id }
    })
    this.permissionsService.hasPermission('routes_update').then(hasPermission => {
      if (hasPermission && routes.id) {
      }
    });
  }
}
