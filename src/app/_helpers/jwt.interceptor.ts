import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthenticationService } from "../_services";

@Injectable()

export class jwtIntrceptor implements HttpInterceptor {
    constructor(
        private authenticationService: AuthenticationService
    ){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentuser = this.authenticationService.currentUserValue;
        if (currentuser && currentuser.token) {
            request = request.clone({
                setHeaders: {
                    authorization: `Bearer ${currentuser.token}`
                }
            });
        }
        return next.handle(request);
    }
}