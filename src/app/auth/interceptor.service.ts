import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService implements HttpInterceptor {
  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // check whether the user is login or not
    if (localStorage.loginUser) {
      // add the authtoken property in the response header
      req = req.clone({
        setHeaders: {
          authtoken: JSON.parse(localStorage.loginUser).token,
        },
      });
    }

    return next.handle(req);
  }
}
