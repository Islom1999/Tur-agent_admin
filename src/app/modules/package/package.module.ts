import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PackageListComponent } from './components/package-list/package-list.component';
import { PackageUpdateComponent } from './components/package-update/package-update.component';
import { RouterModule, Routes } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { UploadImageDirective } from 'src/app/shared/directives';
import { NzImageModule } from 'ng-zorro-antd/image';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BaseModule } from 'src/app/shared/modules';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { RoutesModule } from '../routes/routes.module';

const routes: Routes = [
  { path: '', component: PackageListComponent },
  {
    path: 'add', 
    component: PackageUpdateComponent,
  },
  { 
    path: 'edit/:id', 
    component: PackageUpdateComponent,
  },
  { 
    path: 'edit/:id/routes', 
    loadChildren: () => import('../../modules').then(m => m.RoutesModule),
  },
  { 
    path: 'edit/:id/highlight', 
    loadChildren: () => import('../../modules').then(m => m.HighlightModule),
  },
  { 
    path: 'edit/:id/accommodation', 
    loadChildren: () => import('../../modules').then(m => m.AccommodationModule),
  },
];

@NgModule({
  declarations: [
    PackageListComponent,
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
    NzPopoverModule,
  ]
})
export class PackageModule { }
