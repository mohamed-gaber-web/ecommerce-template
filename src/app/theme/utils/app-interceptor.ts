import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor as NativeHttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { validateBasis } from '@angular/flex-layout';
import { StorageService } from 'src/app/shared/services/storage.service';

environment

@Injectable()
export class AppInterceptor implements NativeHttpInterceptor {

    // BASE_URL = environment.api_base_url;
    
    constructor( 
      private spinner: NgxSpinnerService, 
      public router: Router, 
      public snackBar: MatSnackBar,
      public storageService: StorageService) {}
  
    intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      

        // this.spinner.show();

        // Handling Authorization And Lang

        // console.log(`men d ${this.BASE_URL}/${this.storageService.getLang().code}/${req.url}`);
        // if (!this.validUrl(req.url)) {

            req = req.clone({
              url: `${
                req.url
              }`,
              headers: req.headers.set(
                'Authorization',
                `Bearer ${this.storageService.getAccessToken()}`,
              )
            })

          // }
          

        return next.handle(req).pipe(map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              this.spinner.hide();
            }
            return event;
          }),
          catchError((error: HttpErrorResponse) => {

            if(error.status === 401) {
              this.snackBar.open('something went wrong', '×', {
                panelClass: 'error',
                verticalPosition: 'top',
                duration: 3000,
              });
              this.storageService.clearStorage();
              this.router.navigate(['/user/sign-in'], {
                queryParams: { returnUrl: this.router.routerState.snapshot.url }
              });
                this.spinner.hide();
            } 
            else if(error.status === 500) {
              console.log('something went wrong'); 
            }

            else if(error.status === 403) {
              this.storageService.clearStorage();
              // this.router.navigate(['/user/sign-isn'], {
              //   queryParams: { returnUrl: this.router.routerState.snapshot.url }
              // });
            }
           
            const started = Date.now();            
            const elapsed = Date.now() - started;
            // console.log(`Request for ${req.urlWithParams} failed after ${elapsed} ms.`);
           // debugger;
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
}