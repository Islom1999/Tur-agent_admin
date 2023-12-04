import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutesDetailComponent } from './components/routes-detail/routes-detail.component';
import { RoutesListComponent } from './components/routes-list/routes-list.component';
import { RouterModule, Routes } from '@angular/router';
import { BaseModule } from 'src/app/shared/modules';

const routes: Routes = [
  { path: '', component: RoutesListComponent },
];

@NgModule({
  declarations: [
    RoutesDetailComponent,
    RoutesListComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    RouterModule.forChild(routes),
  ]
})
export class RoutesModule { }
