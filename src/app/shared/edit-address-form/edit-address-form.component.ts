import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CheckoutModule } from 'src/app/pages/checkout/checkout.module';
import { CheckoutService } from 'src/app/pages/checkout/checkout.service';




@Component({
  selector: 'app-edit-address-form',
  templateUrl: './edit-address-form.component.html',
  styleUrls: ['./edit-address-form.component.scss']
})
export class EditAddressFormComponent implements OnInit {

  billingForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private checkoutService: CheckoutService,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<EditAddressFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
    
    ) { 

  }

  ngOnInit(): void {

    // console.log('data', this.dialogRef.componentInstance.data);
    

    this.billingForm = this.formBuilder.group({
      firstName: [this.data.address.firstName, Validators.required],
      lastName: [this.data.address.lastName, Validators.required],
      phone: [this.data.address.phone, Validators.required],
      landline: [this.data.address.landline, Validators.required],
      area: [this.data.address.area, Validators.required],
      streetName: [this.data.address.streetName, Validators.required],
      buildingName: [this.data.address.buildingName, Validators.required],
      floorNumber: [this.data.address.floorNumber, Validators.required],
      apartmentNumber: [this.data.address.apartmentNumber, Validators.required],
      nearestLandmark: [this.data.address.nearestLandmark, Validators.required],
      locationType: [this.data.address.locationType, Validators.required],
      note: [this.data.address.note, Validators.required],
      cityName: [this.data.address.cityName, Validators.required],
    });
    
  }

  onUpdateAddress() {
    const updatedAddressValue: CheckoutModule = this.billingForm.value;
      this.checkoutService.updatedShippingAddress({id: this.data.address.id ,...updatedAddressValue})
      .subscribe(response => {
        if (response['success'] === true) {
          this.snackBar.open('Your address updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
          this.billingForm.reset();
          this.dialogRef.close();
          
          // window.location.reload(); 
        } else {
          this.snackBar.open('Your address updated failed!', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
        }
      })
  }

}
