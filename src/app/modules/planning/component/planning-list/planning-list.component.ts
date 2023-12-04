import { Component } from '@angular/core';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgxPermissionsService } from 'ngx-permissions';
import { Observable, of } from 'rxjs';
import { PlanningService } from 'src/app/modules/planning/service/planning.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { DrawerService } from 'src/app/shared/services/drawer.service';
import { PermissionService } from 'src/app/shared/services/permission.service';
import { IPlanning } from 'src/interfaces';

@Component({
  selector: 'app-planning-list',
  templateUrl: './planning-list.component.html',
  styleUrls: ['./planning-list.component.scss']
})
export class PlanningListComponent {
  plannings$: Observable<IPlanning[]> = of([])
  isDisabled!: boolean;

  constructor(
    private planningScv: PlanningService,
    private permission : PermissionService,
    private breadcrumbService: BreadcrumbsService,
    private permissionsService: NgxPermissionsService,
    private messageSvc: NzMessageService,
  ) {
    this.breadcrumbService.setBreadcrumbs([
      {header:'Planning List', label: 'Planning', url: 'planning' }
    ])
  }

  ngOnInit(): void {
    this.plannings$ = this.planningScv.planning$   
    this.permission.getPermisssion().subscribe(permission => {
      this.permissionsService.loadPermissions(permission);
    }) 
  }

  delete(id:any){
    this.planningScv.deletePlanning(id).subscribe(() => {
      this.messageSvc.success('Product deleted successfully')
    })
  }
  
  cancel(){
    this.messageSvc.info('Product delete cancelled')
  }
}
