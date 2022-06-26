import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { CustomerSignUpComponent } from './customer-signup/customer-signup.component';


export const routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
      {
        path: 'sign-in',
        component: SignInComponent,
        data: { breadcrumb: 'Sign In' },
      },
      {
        path: 'sign-up',
        component: CustomerSignUpComponent,
        data: { breadcrumb: 'Sign Up' },
      },
    ],
  },
]; 



@NgModule({
    imports: [
      CommonModule,
      RouterModule.forChild(routes),
      ReactiveFormsModule,
      SharedModule
    ],
    declarations: [
      SignInComponent,
      CustomerSignUpComponent,
    ],
    // providers: [AuthenticationService],
  })
  export class AuthenticationModule {}