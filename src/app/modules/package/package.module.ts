import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackageListComponent } from './components/package-list/package-list.component';
import { PackageCreateComponent } from './components/package-create/package-create.component';
import { PackageUpdateComponent } from './components/package-update/package-update.component';
import { RouterModule, Routes } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { UploadImageDirective } from 'src/app/shared/directives';
import { NzImageModule } from 'ng-zorro-antd/image';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BaseModule } from 'src/app/shared/modules';

const routes: Routes = [
  { path: '', component: PackageListComponent },
  {
    path: 'add', 
    component: PackageCreateComponent,
  },
  { 
    path: 'edit/:id', 
    component: PackageUpdateComponent,
  },
];

@NgModule({
  declarations: [
    PackageListComponent,
    PackageCreateComponent,
    PackageUpdateComponent
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
export class PackageModule { }
