import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from "@angular/router";
import { PermissionService } from "../services/permission.service";
import { NgxPermissionsService } from "ngx-permissions";

export const canActivatePermission: CanActivateFn = async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  // const permissionService = inject(PermissionService);
  // const ngxPermissionsService = inject(NgxPermissionsService);
  // const router = inject(Router);

  // const permissions = route.data['permissions'] as string[]; // Yo'nalishdan ruxsatlarni olish

  // // Ruxsatlarni yuklash va tekshirish
  // const userPermissions = await permissionService.getPermisssion().toPromise();

  // if (userPermissions && Array.isArray(userPermissions)) {
  //   ngxPermissionsService.loadPermissions(userPermissions);
    
  //   const hasPermission = await ngxPermissionsService.hasPermission(permissions);

  //   if (hasPermission) {
  //     return true;
  //   }
  // }

  // router.navigate(['/login']);
  return true;
};
