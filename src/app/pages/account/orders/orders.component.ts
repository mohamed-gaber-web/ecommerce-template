import { createOrder } from './../../../shared/api/api';
import { RefundFormComponent } from './refund-form/refund-form.component';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { PageEvent } from '@angular/material/paginator';

import { Subscription } from 'rxjs';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {

  sub: Subscription;
  isLoading: boolean = false;
  orderPerPage: number = 5;
  currentPage = 0;
  totalOrders: number = 0;
  pageOption = [2, 5, 10, 25];
  orders: any=[];
  date: Date;
  createOrder: any;
  d;

  @ViewChild('cd', { static: false }) private countdown: any;

  constructor(private ordersService: OrdersService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getOrders();
  }

  // ** Get orders items
  getOrders() {
   this.isLoading = true;  
   this.sub = this.ordersService.getListOfOrders(this.currentPage, this.orderPerPage)
      .subscribe(response => {  
        console.log("orders",response);
        
        this.isLoading = false;
        this.totalOrders = response['length']
        this.orders = response['result'];
        this.orders.forEach((c, i) => {
          console.log('create order', i);
          this.d =  Math.floor(((new Date(c['creationDate']).getTime() + 12096e5) - Date.now()) / (24*3600*1000));
          console.log(this.d);
        })
      })
  }

  // ** Pagination orders
  onPageChanged(pageData: PageEvent) {

    this.isLoading = true;
    this.currentPage = pageData.pageIndex;
    this.orderPerPage = pageData.pageSize;

    this.sub = this.ordersService.getListOfOrders(this.currentPage, this.orderPerPage)
    .subscribe(response => {
      this.isLoading = false;
      this.totalOrders = response['length'];
      this.orders = response['result'];
    })
  }

  // ** Open Details Order
  openDialog(id: number) {
    let dialogRef = this.dialog.open(OrderDetailsComponent, {
      data: {id}
    });
  }

  // ** Open Popup Create Refund
  openRefundForm(orderId: number) {
    const dialogRef = this.dialog.open(RefundFormComponent, {
      width: '600px',
      height: 'auto',
      data: {orderId}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onTimerFinished() {
    console.log('counter finished')
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}

