import { Subscription } from 'rxjs';
import { OrdersService } from './../orders/orders.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-refund-view',
  templateUrl: './refund-view.component.html',
  styleUrls: ['./refund-view.component.scss']
})
export class RefundViewComponent implements OnInit {

  sub: Subscription[] = [];
  isLoading: boolean = false;
  refundItems: any;
  refundImage: boolean = false;
  constructor(private orderService: OrdersService) { }

  ngOnInit(): void {
    this.sub.push(
      this.orderService.getAllRefundItems(0, 10).subscribe(response => {
        console.log(response);
        this.refundItems = response['result'];
      })
    );
  }

  // * show and hide image refund
  toggleImage() {
    this.refundImage = !this.refundImage;
  }

  ngOnDestroy(): void {
    this.sub.forEach(el => {
      el.unsubscribe();
    })
  }

}
