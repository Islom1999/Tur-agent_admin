import { Component } from '@angular/core';
import { BreadcrumbsService } from '../shared/services/breadcrumbs.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  
  breadcrumbs$ = this.breadcrumbService.breadcrumbs$;

  constructor(
    private breadcrumbService: BreadcrumbsService,
    ) {}
}
