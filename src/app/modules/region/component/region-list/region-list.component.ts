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
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.scss']
})
export class RegionListComponent {
  regions$: Observable<IRegion[]> = of([])
  isDisabled!: boolean;

  constructor(
    private regionScv: RegionService,
    private permission : PermissionService,
    private drawerService: DrawerService,
    private breadcrumbService: BreadcrumbsService,
    private nzDrawerService: NzDrawerService,
    private permissionsService: NgxPermissionsService,
    private messageSvc: NzMessageService,
  ) {
    this.breadcrumbService.setBreadcrumbs([
      {header:'Region List', label: 'Region', url: 'region' }
    ])
  }

  ngOnInit(): void {
    this.regions$ = this.regionScv.region$   
    this.permission.getPermisssion().subscribe(permission => {
      this.permissionsService.loadPermissions(permission);
    }) 
  }

  delete(id:any){
    this.regionScv.deleteRegion(id).subscribe(() => {
      this.messageSvc.success('Product deleted successfully')
    })
  }
  
  cancel(){
    this.messageSvc.info('Product delete cancelled')
  }
}
