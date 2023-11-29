import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService {
  breadcrumbs$ = new BehaviorSubject<Array<{header:string, label: string; url: string }>>([]);

  setBreadcrumbs(breadcrumbs: Array<{header:string, label: string; url: string }>) {
    this.breadcrumbs$.next(breadcrumbs);
  }
  constructor() { }
}
