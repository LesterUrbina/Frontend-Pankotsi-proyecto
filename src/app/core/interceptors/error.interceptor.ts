import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { ErrorResponse } from 'src/app/auth/interfaces/login-response.interface';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        const backendError = error.error as ErrorResponse | null;

        // 401 → token inválido / expirado
        if (error.status === 401) {

          // recibimos un 401 es un token expirado
          if (!error.url?.includes('/auth/signin')) {
            this.authService.logout();
            return throwError(() => 'Tu sesión ha expirado. Vuelve a iniciar sesión.');
          }

          // Login fallido
          return throwError(() =>
            backendError?.descripcion ?? 'Credenciales inválidas'
          );

        }

        // 403 → autenticado pero sin permisos
        if (error.status === 403) {
          this.authService.logout();
          return throwError(() =>
            backendError?.descripcion ?? 'Acceso no autorizado'
          );
        }

        //  Error controlado del backend
        if (error.status === 500) {
          return throwError(()=>
            backendError?.descripcion ?? 'Error interno del servidor - frontEnd'
          );
         
        }

        //  Error genérico
        return throwError(() =>
          backendError?.descripcion ?? 'Error inesperado'
                   
        );


      })
    );
  }
}
