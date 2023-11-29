import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, delay, finalize } from 'rxjs';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        // ANGULAR SVG ICON
        if (request.url.startsWith('assets/')) {
            return next.handle(request);
        }

        // IMAGE UPLOADS
        if (request.url.includes('image/upload')) {
            return next.handle(request);
        }

        const loaderService = this.injector


        return next.handle(request);
    }
}
