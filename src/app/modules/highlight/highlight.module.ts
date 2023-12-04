import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDetailComponent } from './components/highlight-detail/highlight-detail.component';
import { HighlightListComponent } from './components/highlight-list/highlight-list.component';
import { RouterModule, Routes } from '@angular/router';
import { BaseModule } from 'src/app/shared/modules';

const routes: Routes = [
  { path: '', component: HighlightListComponent },
];


@NgModule({
  declarations: [
    HighlightDetailComponent,
    HighlightListComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    RouterModule.forChild(routes),
  ]
})
export class HighlightModule { }
