import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IAccomidation } from 'src/interfaces';
import { AccomidationService } from '../../service/accomidation.service';
import { PermissionService } from 'src/app/shared/services/permission.service';
import { DrawerService } from 'src/app/shared/services/drawer.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { ActivatedRoute, Router } from '@angular/router';
import { AccomidationDetailComponent } from '../accomidation-detail/accomidation-detail.component';

@Component({
  selector: 'app-accomidation-list',
  templateUrl: './accomidation-list.component.html',
  styleUrls: ['./accomidation-list.component.scss']
})
export class AccomidationListComponent {
  accomidations$: Observable<IAccomidation[]> = of([])
  // package!: IPackage

  constructor(
    private accomidationScv: AccomidationService,
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
      {header:'Accomidation List', label: 'Package', url: 'package' }
    ])
  }

  get package_id() {
    return this.route.snapshot.params['id']
  }

  ngOnInit(): void {
    // this.accomidations$ = this.accomidationScv.accomidation$ 
    this.accomidationScv.loadAccomidations(this.package_id);
    this.accomidations$ = this.accomidationScv.accomidation$;

    this.permission.getPermisssion().subscribe(permission => {
      this.permissionsService.loadPermissions(permission);
    }) 
  }

  openForCreate() {
    this.nzDrawerService.create({
      nzContent: AccomidationDetailComponent,
      nzContentParams: { package_id:this.package_id }
    })
  }

  openDrawerForUpdate(accomidation: IAccomidation): void {
    this.nzDrawerService.create({
      nzContent: AccomidationDetailComponent,
      nzContentParams: { accomidation, package_id:this.package_id }
    })
    this.permissionsService.hasPermission('accomidation_update').then(hasPermission => {
      if (hasPermission && accomidation.id) {
      }
    });
  }
}
