import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthinterceptorService implements HttpInterceptor {
  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (localStorage.loginUser)
      req = req.clone({
        setHeaders: {
          authtoken: JSON.parse(localStorage.loginUser).token,
        },
      });

    return next.handle(req);
  }
}
