import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanningDetailComponent } from './component/planning-detail/planning-detail.component';
import { PlanningListComponent } from './component/planning-list/planning-list.component';



@NgModule({
  declarations: [
    PlanningDetailComponent,
    PlanningListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class PlanningModule { }
