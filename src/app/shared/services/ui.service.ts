import { Injectable } from "@angular/core";

import { LoadingBarModule, LoadingBarService } from '@ngx-loading-bar/core';
import {
    MatSnackBar,
    MatSnackBarVerticalPosition,
  } from '@angular/material/snack-bar';



@Injectable({
    providedIn: 'root'
})
export class UiService {

    constructor(public loader: LoadingBarService, private snackBar: MatSnackBar,) {}

    showLoadingBar() {
        const loader = this.loader.useRef('router');
        loader.start();
        // console.log('works finally')
      }

      hideLoadingBar() {
        const loader = this.loader.useRef('router');
        loader.complete();
      }
    
      showSpinner() {
        const loader = this.loader.useRef('spinner');
        loader.start();
      }
    
      hideSpinner() {
        const loader = this.loader.useRef('spinner');
        loader.complete();
      }


}