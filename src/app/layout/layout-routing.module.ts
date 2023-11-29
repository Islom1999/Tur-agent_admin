import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';
import { canActivatePermission } from '../shared/guards/permission.guard';

const routes: Routes = [
  { path: '', component: LayoutComponent, children:[
    { path: '', pathMatch: 'full', redirectTo: 'users' },
    {
      path: 'roles', 
      loadChildren: () => import('../modules').then(m => m.RoleModule),
      // canActivate: [canActivatePermission],
      // data: { permissions: ['role_view'] }
    },
    {
      path: 'users', 
      loadChildren: () => import('../modules').then(m => m.UserModule),
      // canActivate: [canActivatePermission],
      // data: { permissions: ['user_view'] }
    },
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
