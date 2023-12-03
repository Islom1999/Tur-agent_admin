import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CountryService } from '../../service/country.service';
import { PermissionService } from 'src/app/shared/services/permission.service';
import { DrawerService } from 'src/app/shared/services/drawer.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NgxPermissionsService } from 'ngx-permissions';
import { ICountry } from 'src/interfaces';
import { CountryDetailComponent } from '../country-detail/country-detail.component';

@Component({
  selector: 'app-country-list',
  templateUrl: './country-list.component.html',
  styleUrls: ['./country-list.component.scss']
})
export class CountryListComponent {
  countrys$: Observable<ICountry[]> = of([])

  constructor(
    private countryScv: CountryService,
    private permission : PermissionService,
    private drawerService: DrawerService,
    private breadcrumbService: BreadcrumbsService,
    private nzDrawerService: NzDrawerService,
    private permissionsService: NgxPermissionsService
  ) {
    this.breadcrumbService.setBreadcrumbs([
      {header:'Role List', label: 'Role', url: 'country' }
    ])
  }

  ngOnInit(): void {
    this.countrys$ = this.countryScv.country$   
    this.permission.getPermisssion().subscribe(permission => {
      this.permissionsService.loadPermissions(permission);
    }) 
  }

  openForCreate() {
    this.drawerService.openDrawer(
      CountryDetailComponent
    )
  }

  openDrawerForUpdate(country: ICountry): void {
    this.nzDrawerService.create({
      nzContent: CountryDetailComponent,
      nzContentParams: { country }
    })
    this.permissionsService.hasPermission('country_update').then(hasPermission => {
      if (hasPermission && country.id) {
      }
    });
  }
}
