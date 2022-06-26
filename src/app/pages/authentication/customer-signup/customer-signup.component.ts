import { Component } from "@angular/core";

import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
  } from '@angular/forms';

  import {
    emailValidator,
    matchingPasswords,
  } from '../../../theme/utils/app-validators';

  import { MatSnackBar } from '@angular/material/snack-bar'; // message alert
  import { Router } from '@angular/router';
import { AuthService } from "../auth.service";

@Component({
    selector: 'app-customer-signup',
    templateUrl: './customer-signup.component.html',
    styleUrls: ['./customer-signup.component.scss']
})

export class CustomerSignUpComponent {

    registerForm: FormGroup;
    isLoading = false;
    hide: boolean = true;

    constructor(private auth: AuthService,
      public formBuilder: FormBuilder, 
      public snackBar: MatSnackBar, 
      public router: Router) {}

    ngOnInit() {

        // Register Fields
        this.registerForm = this.formBuilder.group({
            'FirstName': ['', Validators.compose([Validators.required])],
            'LastName': ['', Validators.compose([Validators.required])],
            'email': ['', Validators.compose([Validators.required, emailValidator])],
            'PhoneNumber': ['', Validators.compose([Validators.minLength(11), Validators.required])],
            'Birthdate': ['', Validators.compose([Validators.required])],
            'Gender': ['', Validators.required],
            'password': ['', Validators.required],
            'confirmPassword': ['', Validators.required]
          },{validator: matchingPasswords('password', 'confirmPassword')});
    }

        // When resister form valid
        public onRegisterFormSubmit(values):void {
            if (this.registerForm.valid) {
              this.isLoading = true
              this.auth.registerCustomer(values).subscribe((response) => {
                console.log(response);

                if(response['success']) {
                  this.snackBar.open('You have registered successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
                  this.router.navigate(['/']);
                } else {
                  
                  response['arrayMessage'].forEach(element => {
                  
                    this.snackBar.open(element, '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
                  });
                }
                
              });
            }
        }

} 