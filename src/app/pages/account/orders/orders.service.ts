import { getAllRefund } from './../../../shared/api/api';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createRefundOrderAPI, getOrderDetails, listOfOrder } from 'src/app/shared/api/api';
import { IRefund } from './refund-form/refund.model';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  // * get orders list
  getListOfOrders(currentPage: number, orderPerPage: number) {
    const params = `?Offset=${currentPage}&Limit=${orderPerPage}`
    return this.http.get(`${listOfOrder}` + params);
  }

  // * get orders details
  getOrderDetails(orderId: number) {
    return this.http.get(`${getOrderDetails}?orderId=${orderId}`);
  }

  // * create refund order
  createRefundOrder(refund: IRefund) {
      return this.http.post(`${createRefundOrderAPI}`, refund);
  }

  // * Get refund order
  getAllRefundItems(offset: number, limit: number) {
    const params = `?Offset=${offset}&Limit=${limit}`
    return this.http.get(`${getAllRefund}` + params)
  }
}
