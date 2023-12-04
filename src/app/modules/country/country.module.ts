import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountryDetailComponent } from './components/country-detail/country-detail.component';
import { CountryListComponent } from './components/country-list/country-list.component';
import { BaseModule } from 'src/app/shared/modules';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: CountryListComponent },
];

@NgModule({
  declarations: [
    CountryDetailComponent,
    CountryListComponent,
    // RouterModule,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    BaseModule,
  ]
})
export class CountryModule { }
