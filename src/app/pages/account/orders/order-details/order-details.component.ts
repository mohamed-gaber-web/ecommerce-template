import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/shared/services/storage.service';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  id: number;
  sub: Subscription;
  orderItems: any;
  isLoading = false;
  


  constructor(
    private ordersService: OrdersService,
    public storageService: StorageService,
    @Inject(MAT_DIALOG_DATA) public data: {id: number} 
    ) { }

  ngOnInit(): void {
    this.getOrdersById()
  }

  getOrdersById() {
    this.isLoading = true;
     this.sub = this.ordersService.getOrderDetails(this.data.id)
     .subscribe(response => {
       this.isLoading = false;
      this.orderItems = response['result'].itemFrontList;

    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
