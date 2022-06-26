import { FormAddressComponent } from './form-address/form-address.component';
import { CheckoutService } from './checkout.service';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { AppService } from '../../app.service';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('horizontalStepper', { static: true }) horizontalStepper: MatStepper;
  @ViewChild('verticalStepper', { static: true }) verticalStepper: MatStepper;
  billingForm: FormGroup;
  addressForm: FormGroup;
  deliveryForm: FormGroup;
  paymentForm: FormGroup;
  deliveryMethods = [];
  grandTotal = 0;
  addressList = [];
  addressFilInput;
  source;
  isLoading = false;


  constructor(public appService:AppService, 
    public formBuilder: FormBuilder, 
    public route: Router,
    public checkoutService: CheckoutService,
    public dialog: MatDialog) { }

  ngOnInit() {    

    this.getShippingAddress();
    this.addressList;
    
    this.appService.Data.cartList.forEach(product=>{
      this.grandTotal += product.discount ? product.cartCount*product.price - product.discount :  product.cartCount*product.price;
    });

    // ** address shipping form 
    this.addressForm = this.formBuilder.group({
      address: [, Validators.required],
    });

    // ** Info user form
    this.billingForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      Landline: ['', Validators.required],
      Area: ['', Validators.required],
      Street: ['', Validators.required],
      buildingName: ['', Validators.required],
      floorNumber: [0, Validators.required],
      apartmentNumber: [0, Validators.required],
      nearestLandmark: ['', Validators.required],
      cationType: ['', Validators.required],
      note: ['', Validators.required],
      city: ['', Validators.required],
    });

    // ** Method form 
    this.deliveryForm = this.formBuilder.group({
      deliveryMethod: [, Validators.required]
    });
  }

  // ** Create order 
  public placeOrder(){

    const infoUser = {
      firstName: this.addressFilInput.firstName,
      lastName: this.addressFilInput.lastName,
      phone: this.addressFilInput.phone,
      landline: this.addressFilInput.landline,
      area: this.addressFilInput.area,
      streetName: this.addressFilInput.streetName,
      buildingName: this.addressFilInput.buildingName,
      floorNumber: this.addressFilInput.floorNumber,
      apartmentNumber: this.addressFilInput.apartmentNumber,
      nearestLandmark: this.addressFilInput.nearestLandmark,
      cationType: this.addressFilInput.cationType,
      cityName: this.addressFilInput.cityName,
      note: this.addressFilInput.note,
      paymentMethodId: +this.deliveryForm.value.deliveryMethod,
      cartItems: this.appService.Data.cartList.map(product => {
        return {
          productId: product.id,
          quantity: product.cartCount 
        }
      })
    }
    
    if(this.addressForm.valid && this.deliveryForm.valid) {
      this.checkoutService.createOrder(infoUser)
        // .pipe(
        // tap(res => {
        //   const token = res['result'].result.paymentKey;
        //   this.source = `https://accept.paymobsolutions.com/api/acceptance/iframes/152312?payment_token=${token}`
        // })
        // )
        .subscribe((response) => {
        // console.log(response['result'].createdDate);
        this.appService.Data.cartList.length = 0;
        this.appService.Data.totalPrice = 0;
        this.appService.Data.totalCartCount = 0;
        localStorage.setItem('cartList', JSON.stringify([]));
        localStorage.setItem('createdOrderDate', response['result'].createdDate);        
      })
    } else {
      return;
    }
    
  }

  openDialog() {
    this.dialog.open(FormAddressComponent)
  }

  // ** Get shipping address
  getShippingAddress() {
    this.isLoading = true;
    this.checkoutService.getShippingAddressByUserId()
    .subscribe(response => {
      this.isLoading = false;
      this.addressList = response['result'];   
    });
  }

  // ** Remove shipping address
  removeAddress(id) {
    this.checkoutService.removeShippingAddressByUserId(id).subscribe(response => {
      if(response) {
        this.addressList = this.addressList.filter(item => item.id !== id);      
      }
      return;
    })
  }

  fillAddress(address) {
    this.addressFilInput = address;
  }

  returnToHome() {
    this.route.navigate(['']);
    // window.location.reload();
  }

}

