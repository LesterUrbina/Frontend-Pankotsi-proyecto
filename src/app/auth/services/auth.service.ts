import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse, UserData } from '../interfaces/login-response.interface';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, finalize, map, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/enviroments/environment';
import { Usuario, UsuarioAuth } from '../interfaces/usuario.interface';
import { ApiResponse } from 'src/app/core/models/api-response';
import { DateUtil } from 'src/app/utils/date-util';
import { ROLE_ROUTES, RoleRouteKey, ROLES } from 'src/app/core/models/roles';


export type UserType = UsuarioAuth | undefined;
//export type RoleRouteKey = keyof typeof ROLE_ROUTES;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseUrl: string = environment.baseUrl
  private readonly authLocalStorageToken = 'auth';

  private currentUserSubject: BehaviorSubject<UserType>;
  public currentUser$: Observable<UserType>;

  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$ = this.isLoadingSubject.asObservable();


  
  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const storedUser = this.getAuthFromLocalStorage();
    this.currentUserSubject = new BehaviorSubject<UserType>(storedUser)
    this.currentUser$ = this.currentUserSubject.asObservable();
  }


  get currentUserValue(): UserType {
    return this.currentUserSubject.value;
  }

  get token(): string | null {
    return this.currentUserValue?.token ?? null;
  }

  get roles(): RoleRouteKey[] {
    return this.currentUserValue?.roles ??  [];
  }


  signin(usuario: LoginRequest): Observable<UsuarioAuth> {

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    const body = Object.keys(usuario)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent((usuario as any)[key])}`)
      .join('&');

    this.isLoadingSubject.next(true);

    return this.http
      .post<ApiResponse<UsuarioAuth>>(`${this.baseUrl}/auth/signin`, body, { headers })
      .pipe(
        map(resp => {

          //validamos que rol recibido exista en el RoleRouteKey, 
          const user ={...resp.data, roles: resp.data.roles.filter(
            (r): r is RoleRouteKey => r in ROLE_ROUTES)
          }

          //persistencia en el localStorage
          this.setAuthFromLocalStorage(user);

          // Actualizamos estado global
          this.currentUserSubject.next(user);
         

          // 🔥 IMPORTANTE:
          // Ahora retornamos el usuario para que el componente decida navegación
          return user;
        }),
        catchError(err => throwError(() => err.error?.descripcion || 'Error de autenticación')),
        finalize(() => this.isLoadingSubject.next(false))
      );
  }


  private setAuthFromLocalStorage(usuarioAuth: UsuarioAuth): void {
    localStorage.setItem(this.authLocalStorageToken, JSON.stringify(usuarioAuth));
  }

  private getAuthFromLocalStorage(): UserType {
    try {
      const data = localStorage.getItem(this.authLocalStorageToken);
      return data ? JSON.parse(data) : undefined;
    } catch {
      return undefined;
    }
  }

  //VALIDACION AUTENTICATION

  // isValidAuth(): boolean {

    // const auth = this.currentUserValue;
    // if (!auth) return false;

    // const { token, expiracionToken, roles } = auth;

    // if (!token) return false;

    //   if (roles.includes('ROLE_ADMIN') || roles.includes('ROLE_USER') || roles.includes('ROLE_SUPER_ADMIN')) {

      
    //   if (DateUtil.now() > DateUtil.parseISO(expiracionToken)) {
    //     return false;
    //   }

    //   return true;
    // }

    // return false;

     // Autenticación básica (token + expiración)
    //if(!this.isAuthenticated()){return false}

    //autorizacion por roles
    //return this.hasAnyRole([ROLES.ADMIN,ROLES.SUPER_ADMIN, ROLES.USER]);

  //}
  

  //autenticacion
  isAuthenticated(): boolean{
    
    if(!this.token) return false;

    return DateUtil.now() <= DateUtil.parseISO(this.currentUserValue!.expiracionToken);
  }

  //Verificar rol puntual
  hasRole(role: RoleRouteKey): boolean {
    return this.roles.includes(role);
  }

  hasAnyRole(rolesPermitidos: RoleRouteKey[]): boolean {
    return rolesPermitidos.some(r => this.roles.includes(r));
  }


 // logout
 
   logout(): void {
    localStorage.removeItem(this.authLocalStorageToken);
    this.currentUserSubject.next(undefined);

    this.router.navigate(['/auth/login'], {
      queryParams: {}
    });
  }


  getDefaultRouteByRole(): string {
  const role = this.roles.find((r): r is RoleRouteKey => r in ROLE_ROUTES);
  return role ? ROLE_ROUTES[role] : '/auth/login';
}
    
}






  // private readonly baseUrl: string = environment.baseUrl;

  // private _userData: UserData | null = null;

  // constructor(private http: HttpClient,
  //   private router: Router) { }


  // get userData(): UserData | null {
  //   return this._userData;
  // }

  // get token(): string | null {
  //   return localStorage.getItem('token');
  // }


  //   get userRole(): string | null {
  //   if (this._userData && this._userData.roles && this._userData.roles.length > 0) {
  //     return this._userData.roles[0];
  //   }
  //   return null;
  // }




  // login(nroCelular: string, clave: string): Observable<boolean> {
  //   const url = `${this.baseUrl}/auth/signin`;

  //   const body = new URLSearchParams();
  //   body.set('nroCelular', nroCelular);
  //   body.set('clave', clave);

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/x-www-form-urlencoded'
  //   });

  //   return this.http.post<LoginResponse>(url, body.toString(), { headers })
  //     .pipe(
  //       map(resp => {
  //         if (resp.data && resp.data.token) {
  //           this._userData = resp.data;
  //           localStorage.setItem('token', resp.data.token);
  //           localStorage.setItem('userData', JSON.stringify(resp.data));
  //           return true;
  //         }
  //         return false;
  //       }),
  //       catchError(err => {
  //         console.error('Error en login:', err);
  //         return of(false);
  //       })
  //     );
  // }

  // redirectByRole(): void {


  //    if (!this._userData) {
  //     const userData = localStorage.getItem('userData');
  //     if (userData) {
  //       this._userData = JSON.parse(userData);
  //     }
  //   }

  //   const role = this.userRole;
  //   console.log('Redirigiendo usuario con rol:', role);

  //   switch(role) {
  //     case 'ROLE_SUPER_ADMIN':
  //       console.log('Navegando a: /superadmin/dashboard'); 
  //       this.router.navigate(['/superadmin/dashboard']);
  //       break;
  //     case 'ROLE_ADMIN':
  //       console.log('Navegando a: /admin/dashboard'); 
  //       this.router.navigate(['/admin/dashboard']);
  //       break;
  //     case 'ROLE_USER':
  //       console.log('Navegando a: /user/dashboard'); 
  //       this.router.navigate(['/user/dashboard']);
  //       break;
  //     default:
  //       console.error('Rol no reconocido:', role);
  //       this.router.navigate(['/auth/login']);
  //   }
  // }



  // logout(): void {
  //   this._userData = null;
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('userData');
  //   this.router.navigate(['/auth/login']);
  // }

  // verificarAutenticacion(): Observable<boolean> {
  //   const token = localStorage.getItem('token');
  //   const userData = localStorage.getItem('userData');

  //   if (!token || !userData) {
  //     return of(false);
  //   }

  //   try {
  //     this._userData = JSON.parse(userData);
  //     console.log('Usuario verificado:', this._userData); 
  //     console.log('Rol del usuario:', this.userRole);
  //     return of(true);
  //   } catch (error) {
  //     console.error('Error al verificar autenticación:', error);
  //     return of(false);
  //   }
  // }

  // isAuthenticated(): boolean {
  //   return !!this.token;
  // }

  // hasRole(role: string): boolean {
  //   return this._userData?.roles?.includes(role) || false;
  // }


