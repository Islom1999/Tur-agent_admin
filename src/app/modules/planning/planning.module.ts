import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanningDetailComponent } from './component/planning-detail/planning-detail.component';
import { PlanningListComponent } from './component/planning-list/planning-list.component';
import { RouterModule, Routes } from '@angular/router';
import { BaseModule } from 'src/app/shared/modules';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { UploadImageDirective } from 'src/app/shared/directives';
import { NzImageModule } from 'ng-zorro-antd/image';
import { DragDropModule } from '@angular/cdk/drag-drop';

const routes: Routes = [
  { path: '', component: PlanningListComponent },
  {
    path: 'add', 
    component: PlanningDetailComponent,
  },
  { 
    path: 'edit/:id', 
    component: PlanningDetailComponent,
  },
];

@NgModule({
  declarations: [
    PlanningDetailComponent,
    PlanningListComponent
  ],
  imports: [
    CommonModule,
    BaseModule,
    RouterModule.forChild(routes),
    CKEditorModule,
    NzPopconfirmModule,
    UploadImageDirective,
    NzImageModule,
    DragDropModule,
  ]
})
export class PlanningModule { }
