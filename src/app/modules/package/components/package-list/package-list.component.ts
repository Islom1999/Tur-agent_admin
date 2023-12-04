import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IPackage } from 'src/interfaces';
import { PackageService } from '../../service/package.service';
import { PermissionService } from 'src/app/shared/services/permission.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { NgxPermissionsService } from 'ngx-permissions';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-package-list',
  templateUrl: './package-list.component.html',
  styleUrls: ['./package-list.component.scss']
})
export class PackageListComponent {
  packeges$: Observable<IPackage[]> = of([])
  isDisabled!: boolean;

  constructor(
    private packegeScv: PackageService,
    private permission : PermissionService,
    private breadcrumbService: BreadcrumbsService,
    private permissionsService: NgxPermissionsService,
    private messageSvc: NzMessageService,
  ) {
    this.breadcrumbService.setBreadcrumbs([
      {header:'Package List', label: 'Package', url: 'package' }
    ])
  }

  ngOnInit(): void {
    this.packeges$ = this.packegeScv.packege$   
    this.permission.getPermisssion().subscribe(permission => {
      this.permissionsService.loadPermissions(permission);
    }) 
  }

  delete(id:any){
    this.packegeScv.deletePackage(id).subscribe(() => {
      this.messageSvc.success('Product deleted successfully')
    })
  }
  
  cancel(){
    this.messageSvc.info('Product delete cancelled')
  }
}
