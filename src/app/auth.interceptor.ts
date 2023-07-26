import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, exhaustMap, Observable, take, throwError } from 'rxjs';

import { GlobalFacade } from '@store';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, public globalFacade: GlobalFacade) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.globalFacade.user$.pipe(
      take(1),
      exhaustMap((user) => {
        const setHeaders: { Authorization?: string; 'x-language': string } = {
          'x-language': localStorage.getItem('ng-language') || 'vn',
        };
        if (!req.headers.get('Authorization')) {
          setHeaders['Authorization'] = 'Bearer ' + (user ? user.tokenString : '');
        }
        return next.handle(req.clone({ setHeaders })).pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              this.router.navigate(['/auth']);
            }
            return throwError(error);
          }),
        );
      }),
    );
  }
}
