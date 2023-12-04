import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PartnerListComponent } from './components/partner-list/partner-list.component';
import { PartnerDetailComponent } from './components/partner-detail/partner-detail.component';
import { RouterModule, Routes } from '@angular/router';
import { BaseModule } from 'src/app/shared/modules';
import { UploadImageDirective } from 'src/app/shared/directives';

const routes: Routes = [
  { path: '', component: PartnerListComponent },
];

@NgModule({
  declarations: [
    PartnerListComponent,
    PartnerDetailComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    UploadImageDirective,
    RouterModule.forChild(routes)
  ]
})
export class PartnerModule { }
