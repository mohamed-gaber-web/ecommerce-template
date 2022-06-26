import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/shared/services/storage.service';
import { emailValidator, matchingPasswords } from '../../../theme/utils/app-validators';
import { AuthService } from '../../authentication/auth.service';
import { UserInformationService } from './user-information.service';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  infoForm: FormGroup;
  passwordForm: FormGroup;
  sub: Subscription;
  constructor(
    public formBuilder: FormBuilder, 
    public snackBar: MatSnackBar, 
    private userInfo: UserInformationService,
    private router: Router,
    private storageService: StorageService) { }

  ngOnInit() {
    this.infoForm = this.formBuilder.group({
      'firstName': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'lastName': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      'email': ['', Validators.compose([Validators.required, emailValidator])],
      'phoneNumber': ['', Validators.compose([Validators.required])],
      'birthdate': [''],
      'Gender': ['']
    });

    this.passwordForm = this.formBuilder.group({
      'currentPassword': ['', Validators.required],
      'newPassword': ['', Validators.required],
      'confirmPassword': ['', Validators.required]
    },{validator: matchingPasswords('newPassword', 'confirmPassword')});
  }

  public onInfoFormSubmit(values:Object):void {
    if (this.infoForm.valid) {
      this.snackBar.open('Your account information updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
  }

  // public onPasswordFormSubmit(values:Object):void {
  //   if (this.passwordForm.valid) {
  //     this.snackBar.open('Your password changed failed!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
  //   }
  // }

  // updated Password

  updatedUserInfo() {
    if (this.infoForm.invalid) {
      return;
    }
    const user = JSON.parse(localStorage.getItem('user')); // get user id
   this.userInfo.updatedUserProfile({id: user.nameid, ...this.infoForm.value})
   .subscribe(response => {
    if (response['success'] === true) {
        this.snackBar.open('Password Updated Success', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this.storageService.clearStorage();
        this.router.navigate(['user/sign-in']);
      } else {
        this.snackBar.open('Password Updated Failed Please Try Again Later!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });      
        this.router.navigate(['account/information']);
        this.infoForm.reset;
      }

    })
  }

  updateUserPassword() {
    if (this.passwordForm.invalid) {
      return;
    }
    
   this.userInfo.updatedPassword(this.passwordForm.value).subscribe(response => {
      if (response['success'] === true) {
        this.snackBar.open('Password Updated Success', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this.storageService.clearStorage();
        this.router.navigate(['user/sign-in']);
      } else {
        this.snackBar.open('Password Updated Failed Please Try Again Later!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });      
        this.router.navigate(['account/information']);

      }

    })
  }

  // ngOnDestroy() {
  //   this.sub.unsubscribe();
  // }

}
