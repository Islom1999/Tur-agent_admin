import { Component } from '@angular/core';
import { BreadcrumbsService } from 'src/app/shared/services/breadcrumbs.service';

@Component({
  selector: 'breadcrumb',
  templateUrl: './breadcurmb.component.html',
  styleUrls: ['./breadcurmb.component.scss']
})
export class BreadcurmbComponent {
  
  constructor(private breadcrumbService: BreadcrumbsService) { }
  
  breadcrumbs$ = this.breadcrumbService.breadcrumbs$;
}
