import { Component, OnInit } from '@angular/core';

import { CheckoutService } from './../checkout.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-form-address',
  templateUrl: './form-address.component.html',
  styleUrls: ['./form-address.component.scss']
})
export class FormAddressComponent implements OnInit {

  billingForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder, 
    private checkoutService: CheckoutService,
    public dialog: MatDialog) {
      

     }

  ngOnInit(): void {

    this.billingForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', [Validators.required,Validators.pattern("^((\\+2-?)|0)?[0-9]{11}$")]],
      landline: ['',[Validators.required,Validators.pattern("^((\\[0-9]{3}-?)|0)?[0-9]{9}$")]],
      area: ['', Validators.required],
      streetName: ['', Validators.required],
      buildingName: ['', Validators.required],
      floorNumber: [, Validators.required],
      apartmentNumber: [, Validators.required],
      nearestLandmark: ['', Validators.required],
      locationType: ['', Validators.required],
      note: [''],
      cityName: ['', Validators.required],
    });
    if(this.billingForm){
      console.log(this.billingForm)
    }
  }

  onSaveAddress() {
    if (this.billingForm.valid) {
      this.checkoutService.createShippingAddress(this.billingForm.value).subscribe(() => { 
        this.billingForm.reset();
        window.location.reload(); 
      })
    }
  }

}
