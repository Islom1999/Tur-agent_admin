import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogListComponent } from './component/blog-list/blog-list.component';
import { BlogDetailComponent } from './component/blog-detail/blog-detail.component';
import { BaseModule } from 'src/app/shared/modules';
import { RouterModule, Routes } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { UploadImageDirective } from 'src/app/shared/directives';
import { NzImageModule } from 'ng-zorro-antd/image';
import { DragDropModule } from '@angular/cdk/drag-drop';

const routes: Routes = [
  { path: '', component: BlogListComponent },
  {
    path: 'add', 
    component: BlogDetailComponent,
  },
  { 
    path: 'edit/:id', 
    component: BlogDetailComponent,
  },
];


@NgModule({
  declarations: [
    BlogListComponent,
    BlogDetailComponent
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
export class BlogModule { }
