import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../authentication/auth.service';
import { CheckoutService } from '../../checkout/checkout.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  addressItems: any;
  sub: Subscription;
  isLoading = false;

  constructor(private checkoutService: CheckoutService, public authService: AuthService) { }

  ngOnInit() {

    this.isLoading = true;
    
    this.sub = this.checkoutService.getShippingAddressByUserId()
    .subscribe(response => {
      this.isLoading = false;
      this.addressItems = response['result'];
    })
  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }

}
