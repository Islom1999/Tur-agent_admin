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
    {
      path: 'country', 
      loadChildren: () => import('../modules').then(m => m.CountryModule),
      // canActivate: [canActivatePermission],
      // data: { permissions: ['user_view'] }
    },
    {
      path: 'region', 
      loadChildren: () => import('../modules').then(m => m.RegionModule),
      // canActivate: [canActivatePermission],
      // data: { permissions: ['user_view'] }
    },
    {
      path: 'planning', 
      loadChildren: () => import('../modules').then(m => m.PlanningModule),
      // canActivate: [canActivatePermission],
      // data: { permissions: ['user_view'] }
    },
    {
      path: 'partner', 
      loadChildren: () => import('../modules').then(m => m.PartnerModule),
      // canActivate: [canActivatePermission],
      // data: { permissions: ['user_view'] }
    },
    {
      path: 'package', 
      loadChildren: () => import('../modules').then(m => m.PackageModule),
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
