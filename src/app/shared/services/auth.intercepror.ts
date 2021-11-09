import { Injectable } from "@angular/core";
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "./Auth.service";

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

  constructor( private authService: AuthService){}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isAuth) {
      req = req.clone({
        setParams: {
          auth: this.authService.token as string
        }
      })
    }

    return next.handle(req)
      .pipe(catchError((error: HttpErrorResponse) => {
        if(error.status === 401) {
          console.log('[Interceptor error]: ', error)
          this.authService.logout({session: false});
        }
        return throwError(error);
      }))
  }
}