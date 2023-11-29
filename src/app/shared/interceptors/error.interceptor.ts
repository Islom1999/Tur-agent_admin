import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, retry, take, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NotFoundError } from 'src/errors/not-found-error';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private toastr: NzMessageService, private router: Router, private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.startsWith('assets/')) {
      return next.handle(request);
    }

    return next.handle(request).pipe(
      retry(2),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.toastr.error(error.error.message);
          this.authService.logout();
          this.router.navigate(['/login']);
        }
        
        // if error statuses are 400, 403, 404, 500 then show error message
        if (error.status === 400 || error.status === 403 || error.status === 404 || error.status === 500) {
          // this.toastr.error(error.error.message);
        }
        // if not connected to internet
        if (error.status === 0) {
          this.toastr.error('Please check your internet connection');
        }
        return throwError(() => new NotFoundError(error.error.message));
      })
    );
  }
}
