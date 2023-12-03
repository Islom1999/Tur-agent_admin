import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionListComponent } from './component/region-list/region-list.component';
import { RegionDetailComponent } from './component/region-detail/region-detail.component';
import { BaseModule } from 'src/app/shared/modules';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: RegionListComponent },
];


@NgModule({
  declarations: [
    RegionListComponent,
    RegionDetailComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    RouterModule.forChild(routes),
  ]
})
export class RegionModule { }
