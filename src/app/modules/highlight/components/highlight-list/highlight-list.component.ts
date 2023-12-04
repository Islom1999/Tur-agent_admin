import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IHighlight } from 'src/interfaces';
import { HighlightService } from '../../service/highlight.service';
import { PermissionService } from 'src/app/shared/services/permission.service';
import { DrawerService } from 'src/app/shared/services/drawer.service';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NgxPermissionsService } from 'ngx-permissions';
import { ActivatedRoute, Router } from '@angular/router';
import { HighlightDetailComponent } from '../highlight-detail/highlight-detail.component';

@Component({
  selector: 'app-highlight-list',
  templateUrl: './highlight-list.component.html',
  styleUrls: ['./highlight-list.component.scss']
})
export class HighlightListComponent {
  highlights$: Observable<IHighlight[]> = of([])
  // package!: IPackage

  constructor(
    private highlightScv: HighlightService,
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
      {header:'Highlight List', label: 'Package', url: 'package' }
    ])
  }

  get package_id() {
    return this.route.snapshot.params['id']
  }

  ngOnInit(): void {
    // this.highlights$ = this.highlightScv.highlight$ 
    this.highlightScv.loadHighlights(this.package_id);
    this.highlights$ = this.highlightScv.highlight$;

    this.permission.getPermisssion().subscribe(permission => {
      this.permissionsService.loadPermissions(permission);
    }) 
  }

  openForCreate() {
    this.nzDrawerService.create({
      nzContent: HighlightDetailComponent,
      nzContentParams: { package_id:this.package_id }
    })
  }

  openDrawerForUpdate(highlight: IHighlight): void {
    this.nzDrawerService.create({
      nzContent: HighlightDetailComponent,
      nzContentParams: { highlight, package_id:this.package_id }
    })
    this.permissionsService.hasPermission('highlight_update').then(hasPermission => {
      if (hasPermission && highlight.id) {
      }
    });
  }
}
