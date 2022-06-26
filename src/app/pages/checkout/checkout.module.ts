import { AuthGuard } from './../../shared/guard/auth.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CheckoutComponent } from './checkout.component';
import { FormAddressComponent } from './form-address/form-address.component';



export const routes = [
  { path: '', component: CheckoutComponent, pathMatch: 'full', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    CheckoutComponent,
    FormAddressComponent  
  ]
})
export class CheckoutModule { }
