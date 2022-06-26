import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Data, AppService } from '../../app.service';
import { Product } from '../../app.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compare',
  templateUrl: './compare.component.html',
  styleUrls: ['./compare.component.scss']
})
export class CompareComponent implements OnInit {

  compareProductsList: any;
  prdListAvailability:boolean=false;
  
  constructor(public appService:AppService, public snackBar: MatSnackBar, private route: Router) { }

  ngOnInit() { 
    // this.appService.Data.cartList.forEach(cartProduct=>{
    //   this.appService.Data.compareList.forEach(product => {
    //     console.log(product);
    //     if(cartProduct.id == product.id){
    //       product.cartCount = cartProduct.cartCount;
    //     }
    //   });
    // });
    this.compareProductsList = JSON.parse(localStorage.getItem('compareProducts'));
    console.log("works",this.compareProductsList);
    this.checkProductsList();
    
  }

  public remove(product:Product) {
      const index: number = this.appService.Data.compareList.indexOf(product);
      if (index !== -1) {
          this.appService.Data.compareList.splice(index, 1);
      }        
  }
  public checkProductsList(){
    if(this.compareProductsList.length==0 || !this.compareProductsList){
      this.prdListAvailability=false;
    }
    else {
      this.prdListAvailability=true;
    }
  }
  public clear(){
    this.appService.Data.compareList.length = 0;
    localStorage.setItem('compareProducts', JSON.stringify([]));
    this.appService.compareTotal.length = 0
    this.route.navigate(['/'])
  }

  public addToCart(product:Product){
    product.cartCount = product.cartCount + 1;
    if(product.cartCount <= product.availibilityCount){
      this.appService.addToCart(product);
    }
    else{
      product.cartCount = product.availibilityCount;
      this.snackBar.open('You can not add more items than available. In stock ' + product.availibilityCount + ' items and you already added ' + product.cartCount + ' item to your cart', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
    }
  }

}
