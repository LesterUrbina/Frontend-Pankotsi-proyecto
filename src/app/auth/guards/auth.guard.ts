import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RoleRouteKey } from 'src/app/core/models/roles';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
    private router: Router
  ) { }

 canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {

    // 1️⃣ No autenticado
    if (!this.authService.isAuthenticated()) {
      return this.router.createUrlTree(['/auth/login'],{ queryParams: { returnUrl: state.url } }
      );
    }

    // 2️⃣ Autenticado pero sin rol permitido
    const rolesPermitidos = route.data?.['roles'] as RoleRouteKey[] | undefined;

    if (rolesPermitidos && !this.authService.hasAnyRole(rolesPermitidos)) {
      return this.router.createUrlTree([this.authService.getDefaultRouteByRole()]);
    }

    // 3️⃣ Autorizado
    return true;
  }





  //  Autenticado pero sin rol permitido
  

  //  canActivate(route: ActivatedRouteSnapshot,
  //              state : RouterStateSnapshot ): boolean | UrlTree{
  //   return this.checkAccess(route.data?.['roles']);
  // }


  // canLoad(route: Route): boolean | UrlTree{
  //   return this.checkAccess(route.data?.['roles']);
  // }


  // private checkAccess(rolesPermitidos?: string[]): boolean | UrlTree {


  //   if (!this.authService.isAuthenticated()) {
  //     return this.router.createUrlTree(['/auth/login'])
  //   }

  //   if (rolesPermitidos && !this.authService.hasAnyRole(rolesPermitidos)) {

  //     return this.router.createUrlTree([
  //       this.authService.getDefaultRouteByRole()
  //     ])
  //   }


  //   return true;
  // }
 
}

