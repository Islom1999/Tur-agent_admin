import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IPartner } from 'src/interfaces';
import { PartnerService } from '../../service/partner.service';
import { PermissionService } from 'src/app/shared/services/permission.service';
import { DrawerService } from 'src/app/shared/services/drawer.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NgxPermissionsService } from 'ngx-permissions';
import { PartnerDetailComponent } from '../partner-detail/partner-detail.component';
import { ImageService } from 'src/app/shared/services/image.service';

@Component({
  selector: 'app-partner-list',
  templateUrl: './partner-list.component.html',
  styleUrls: ['./partner-list.component.scss']
})
export class PartnerListComponent {
  partners$: Observable<IPartner[]> = of([])

  constructor(
    private partnerScv: PartnerService,
    private permission : PermissionService,
    private drawerService: DrawerService,
    private breadcrumbService: BreadcrumbsService,
    private nzDrawerService: NzDrawerService,
    private permissionsService: NgxPermissionsService,
    private imageSvc: ImageService, 
  ) {
    this.breadcrumbService.setBreadcrumbs([
      {header:'Partner List', label: 'Partner', url: 'partner' }
    ])
  }

  ngOnInit(): void {
    this.partners$ = this.partnerScv.partner$   
    this.permission.getPermisssion().subscribe(permission => {
      this.permissionsService.loadPermissions(permission);
    }) 
  }

  openForCreate() {
    this.drawerService.openDrawer(
      PartnerDetailComponent
    )
  }

  openDrawerForUpdate(partner: IPartner): void {
    this.nzDrawerService.create({
      nzContent: PartnerDetailComponent,
      nzContentParams: { partner }
    })
    this.permissionsService.hasPermission('partner_update').then(hasPermission => {
      if (hasPermission && partner.id) {
      }
    });
  }

  getImageUrl(image: string): string {
    return this.imageSvc.getImageUrl(image);
  }
}
