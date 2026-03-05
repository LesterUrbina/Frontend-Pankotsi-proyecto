import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { RoleRouteKey } from 'src/app/core/models/roles';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {

    //  No autenticado
    if (!this.authService.isAuthenticated()) {
      return this.router.createUrlTree(['/auth/login'], { queryParams: { returnUrl: state.url } }
      );
    }

    //  Autenticado pero SIN ROLES (estado inválido)
    if (this.authService.roles.length === 0) {
      this.authService.logout();
      return this.router.createUrlTree(['/auth/login']);
    }

    //  Autenticado pero SIN PERMISO para la ruta
    const rolesPermitidos = route.data?.['roles'] as RoleRouteKey[] | undefined;

    if (rolesPermitidos && !this.authService.hasAnyRole(rolesPermitidos)) {
      return this.router.createUrlTree([
        this.authService.getDefaultRouteByRole()
      ]);
    }
     return true;
  }


  
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): boolean {

    // 1️⃣ No autenticado → no cargar módulo
    if (!this.authService.isAuthenticated()) {
      return false;
    }

    // 2️⃣ Autenticado pero sin roles → estado inválido
    if (this.authService.roles.length === 0) {
      this.authService.logout();
      return false;
    }

    // 3️⃣ Validación de roles del módulo
    const rolesPermitidos = route.data?.['roles'] as RoleRouteKey[] | undefined;

    if (rolesPermitidos && !this.authService.hasAnyRole(rolesPermitidos)) {
      return false;
    }

    return true;
  }

}

