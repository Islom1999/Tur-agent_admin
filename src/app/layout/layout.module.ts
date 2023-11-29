import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { BreadcurmbComponent } from './components';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';
import { LanguageDropdownComponent } from '../shared/components/language-dropdown/language-dropdown.component';
import { HeaderProfileComponent } from '../shared/components/header-profile/header-profile.component';
import { ChangeThemeComponent } from '../shared/components/change-theme/change-theme.component';
import { BaseModule } from '../shared/modules';


@NgModule({
  declarations: [
    LayoutComponent,
    BreadcurmbComponent,
    SidenavComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    NzLayoutModule,
    NzIconModule,
    NzBreadCrumbModule,
    NzMenuModule,
    NzDropDownModule,
    NzAvatarModule,
    FormsModule,
    LanguageDropdownComponent,
    HeaderProfileComponent,
    ChangeThemeComponent,
    BaseModule
  ]
})
export class LayoutModule {}
