import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private AUTH_HEADER = 'Authorization';
    private get access_token(): string | null {
        return localStorage.getItem('access_token');
    }

    private get refresh_token(): string | null {
        return localStorage.getItem('refresh_token');
    }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (
            request.url.includes('/auth/login') ||
            request.url.includes('/auth/register') ||
            request.url.startsWith('assets/')
        ) {
            return next.handle(request);
        }

        if (!request.headers.has('Content-Type') && !(request.body instanceof FormData)) {
            request = request.clone({
                headers: request.headers.append('Content-Type', 'application/json'),
            });
        }

        if (request.url.includes('refresh')) {
            request = request.clone({
                headers: request.headers.set(this.AUTH_HEADER, `Bearer ${this.refresh_token}`),
            });
        } else {
            request = this.addAuthenticationToken(request);
        }

        return next.handle(request);
    }

    private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {

        if (!this.access_token) {
            return request;
        }

        return request.clone({
            headers: request.headers.set(this.AUTH_HEADER, 'Bearer ' + this.access_token),
        });
    }
}
