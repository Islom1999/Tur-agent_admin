import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccomidationListComponent } from './component/accomidation-list/accomidation-list.component';
import { AccomidationDetailComponent } from './component/accomidation-detail/accomidation-detail.component';
import { BaseModule } from 'src/app/shared/modules';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: AccomidationListComponent },
];

@NgModule({
  declarations: [
    AccomidationListComponent,
    AccomidationDetailComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    RouterModule.forChild(routes),
  ]
})
export class AccommodationModule { }
