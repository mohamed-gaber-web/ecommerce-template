import { HttpErrorResponse, HttpEvent, HttpHandler, HttpRequest, HttpResponse } from "@angular/common/http";
import { NgxSpinnerService } from 'ngx-spinner';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { throwError } from "rxjs";
import { Observable } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { StorageService } from "./shared/services/storage.service";

@Injectable()

export class HttpInterceptor {

    // BASE_URL = environment.api_base_url;

    constructor(private storageService: StorageService, public router: Router, public spinner: NgxSpinnerService) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
      ): Observable<HttpEvent<any>> {
        this.spinner.show();
    
        // if (!this.validUrl(request.url)) {
        //   request = request.clone({
        //     url: `${this.BASE_URL}/${this.storageService.getLang().code}/${
        //       request.url
        //     }`,
        //     headers: request.headers.set(
        //       'Authorization',
        //       `Bearer ${this.storageService.getAccessToken()}`
        //     ),
        //   });
        // }
    
        return next.handle(request).pipe(
          map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              this.spinner.hide();
            }
            return event;
          }),
          catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
              this.storageService.clearStorage();
              this.router.navigate(['/user/sign-in'], {
                queryParams: { returnUrl: this.router.routerState.snapshot.url }
              });
            } else if(error.status === 500) {
              console.log('something went wrong');
              // return throwError('something went wrong');
            }
            const started = Date.now();
            const elapsed = Date.now() - started;
            console.log(
              `Request for ${request.urlWithParams} failed after ${elapsed} ms.`
            );
            // debugger;
            // this.spinner.hide();
            return throwError(error);
          })
        );
      }

    
    /**
    * Check if the url is valid and has http or https.
    */
        validUrl(url) {
            return url.includes('http://') || url.includes('https://');
        }


    /**
     * Handle http errors.
     */
        handleError(error) {
            let errorMessage = '';
            if (error.error instanceof ErrorEvent) {
            // client-side error
            errorMessage = error.error.message;
            } else {
            // server-side error
            errorMessage = `${error.status} : ${error.statusText}`;
            }

            return throwError({
            code: error.status,
            message: error.statusText,
            error: error.error,
            });
        }

}