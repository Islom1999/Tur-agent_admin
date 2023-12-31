import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegionListComponent } from './component/region-list/region-list.component';
import { RegionDetailComponent } from './component/region-detail/region-detail.component';
import { BaseModule } from 'src/app/shared/modules';
import { RouterModule, Routes } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { UploadImageDirective } from 'src/app/shared/directives';
import { NzImageModule } from 'ng-zorro-antd/image';
import { DragDropModule } from '@angular/cdk/drag-drop';

const routes: Routes = [
  { path: '', component: RegionListComponent },
  {
    path: 'add', 
    component: RegionDetailComponent,
  },
  { 
    path: 'edit/:id', 
    component: RegionDetailComponent,
  },
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
    CKEditorModule,
    NzPopconfirmModule,
    UploadImageDirective,
    NzImageModule,
    DragDropModule,
    // NzAutocompleteModule
  ]
})
export class RegionModule { }
