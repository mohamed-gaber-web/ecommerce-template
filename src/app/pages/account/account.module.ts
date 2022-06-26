import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { AccountComponent } from './account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InformationComponent } from './information/information.component';
import { AddressesComponent } from './addresses/addresses.component';
import { OrdersComponent } from './orders/orders.component';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';
import { FormAddressComponent } from '../checkout/form-address/form-address.component';
import { OrderDetailsComponent } from './orders/order-details/order-details.component';
import { RefundFormComponent } from './orders/refund-form/refund-form.component';
import { RefundViewComponent } from './refund-view/refund-view.component';


export const routes = [
  { 
      path: '', 
      component: AccountComponent, children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: {  breadcrumb: 'Account' } },
          { path: 'information', component: InformationComponent, data: {  breadcrumb: 'Information' } },
          { path: 'addresses', component: AddressesComponent, data: {  breadcrumb: 'Addresses' } },
          { path: 'orders', component: OrdersComponent, data: {  breadcrumb: 'Orders' } },
          { path: 'refund', component: RefundViewComponent, data: {  breadcrumb: 'Refund' } }
      ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    AccountComponent,
    DashboardComponent,
    InformationComponent,
    AddressesComponent,
    OrdersComponent,
    FormAddressComponent,
    OrderDetailsComponent,
    RefundFormComponent,
    RefundViewComponent
  ]
})
export class AccountModule { }
