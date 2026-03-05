import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {

    
     // 🔹 Endpoints públicos
    if (req.url.includes('/auth/signin')) {
      return next.handle(req);
    }

    const token = this.authService.token;

    if (!token) {
      return next.handle(req);
    }

     const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next.handle(authReq);
  }
}
