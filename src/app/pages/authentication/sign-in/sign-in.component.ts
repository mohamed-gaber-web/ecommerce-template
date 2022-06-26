import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { emailValidator, matchingPasswords } from '../../../theme/utils/app-validators';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/shared/services/storage.service';
import { AuthService } from '../auth.service';
import { LoginCustomer } from 'src/app/shared/models/customer-login';

import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  isLoading: boolean = false;
  hide: boolean = true;
  returnUrl: string;
  loginUser: LoginCustomer;
  subs: Subscription[] = [];
  loginCredentials: LoginCustomer;

  loginFormErrors = {
    Email: '',
    Password: '',
  };

  loginValidationMessages = {
    Email: {
      required: 'Email field is required',
      invalidEmail: 'Email field must be a valid email',
    },
    Password: {
      required: 'Password field is required',
    },
  };

  constructor(
    public formBuilder: FormBuilder, 
    public router:Router, 
    public snackBar: MatSnackBar,
    public route: ActivatedRoute,
    public storageService: StorageService,
    public translate: TranslateService,
    public auth: AuthService) {}



  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    this.loginCredentials = new LoginCustomer();
    this.buildLoginForm();

    // this.loginForm = this.formBuilder.group({
    //   'email': ['', Validators.compose([Validators.required, emailValidator])],
    //   'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])] 
    // });

  }

  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      Email: ['', Validators.compose([Validators.required, emailValidator])],
      Password: ['', Validators.required],
    });
    this.loginForm.valueChanges.subscribe((data) => this.validateLoginForm());
  }

  validateLoginForm(isSubmitting = false) {
    for (const field of Object.keys(this.loginFormErrors)) {
      this.loginForm[field] = '';

      const input = this.loginForm.get(field) as FormControl;
      if (input.invalid && (input.dirty || isSubmitting)) {
        for (const error of Object.keys(input.errors)) {
          this.loginForm[field] = this.loginValidationMessages[field][error];
        }
      }
    }
  }

  public onLoginFormSubmit(values): void {
    this.validateLoginForm(true);
    if (this.loginForm.valid) {
      this.isLoading = true;
      Object.assign(this.loginCredentials, this.loginForm.value);
      this.auth.signInUser(this.loginCredentials).subscribe(
        (response) => {
          
          if(response['success'] === true) {
            this.storageService.setAccessToken(response['result']);
            this.storageService.setExpiresIn(
              new Date(response['.expires']).getTime() / 1000 // .expires
            );
            // this.signInService.IsLoggedIn();
            this.snackBar.open('You signed in successfully!', '×', {
              panelClass: 'success',
              verticalPosition: 'top',
              duration: 3000,
            });
            this.router.navigateByUrl(this.returnUrl);
          } else {
            this.snackBar.open(response['arrayMessage'][0], '×', {
              panelClass: 'error',
              verticalPosition: 'top',
              duration: 3000,
            });
            this.router.navigate(['/user/sign-in'])
          }
        },
        (error) => {
          Object.keys(error).forEach((key) => {
            this.snackBar.open(error[key][0], '×', {
              panelClass: 'error',
              verticalPosition: 'top',
              duration: 3000,
            });
          });

          this.loginForm.reset();
          this.isLoading = false;
        },
        () => (this.isLoading = false)
      );
    }
  }


  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }

}
