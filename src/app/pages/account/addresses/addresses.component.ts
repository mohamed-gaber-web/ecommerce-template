import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService, Data } from '../../../app.service';
import { CheckoutService } from '../../checkout/checkout.service';
import { Subscription } from 'rxjs';
import { FormAddressComponent } from '../../checkout/form-address/form-address.component';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { EditAddressFormComponent } from 'src/app/shared/edit-address-form/edit-address-form.component';


@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {
  shippingForm: FormGroup;
  allAddressByUser: any;
  subscription: Subscription;
  isLoading = false;

  constructor(
    public appService:AppService, 
    public formBuilder: FormBuilder, 
    public snackBar: MatSnackBar,
    private checkoutService: CheckoutService,
    public dialog: MatDialog) { }


  ngOnInit() {
    this.isLoading = true;
     this.getAddressByUser().subscribe(data => {
      this.isLoading = false; 
      this.allAddressByUser = data['result'];  
      console.log(data['result'])     
     })  
  }

  private getAddressByUser() {
    // const userToken = localStorage.getItem('access_token');
    this.isLoading = true;
    return this.checkoutService.getShippingAddressByUserId();
  }

  onRemoveAddress(id: number) {

    this.checkoutService.removeShippingAddressByUserId(id).subscribe(response => {
      this.isLoading = true;
      if(response) {
        // const index = this.addressList.indexOf(add => add === add.id)
        this.allAddressByUser = this.allAddressByUser.filter(item => item.id !== id);
        this.isLoading = false;
        this.snackBar.open('The address has been deleted! ', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      }
      return;     
    })
  }

  openDialog(address) {
    let dialogRef = this.dialog.open(EditAddressFormComponent, {
      data: {address: address}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.isLoading = true; 
      this.getAddressByUser().subscribe(data => {
        this.isLoading = false; 
        this.allAddressByUser = data['result'];       
       })  
    });

  }

  // ngOnDestroy(): void {
  //   this.allAddressByUser$.unsubscribe();
  // }

}
