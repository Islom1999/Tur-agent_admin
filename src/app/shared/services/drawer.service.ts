import { Injectable, Type } from '@angular/core';
import { NzDrawerOptions, NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';

@Injectable({
  providedIn: 'root'
})
export class DrawerService {


  constructor(private nzDrawerService: NzDrawerService) { }

  openDrawer<T>(component: Type<{}>, data?: T): NzDrawerRef<{}> {
    const config: NzDrawerOptions = {
      nzContent: component,
      nzContentParams:{data}
    };
    if (data) config.nzContentParams = { data };
    return this.nzDrawerService.create(config);
  }
}
