import { Component, OnInit } from '@angular/core';
import { Data, AppService } from '../../app.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  total = [];
  grandTotal = 0;
  grandTotalDiscount = 0;
  cartItemCount = [];
  cartItemCountTotal = 0;
  cartListStorage; // cart list items from localStorage
  cartCountItem;
  totalCartCount;
  totalPriceItems;
  totalCartDiscount = [];
  constructor(public appService:AppService) { }

  ngOnInit() {
    /// code me get cart list from localStorage
    
    this.cartListStorage = JSON.parse(localStorage.getItem('cartList'));
    this.cartListStorage.forEach(product=>{
      this.total[product.id] = product.cartCount*product.price;
      this.totalCartDiscount[product.id] = product.cartCount*product.price - product.discount;
      this.grandTotal += product.discount ? product.cartCount*product.price - product.discount : product.cartCount*product.price;
      this.grandTotalDiscount += product.cartCount*product.discount;
      // this.totalCartDiscount = product.cartCount * product.discount
      this.cartItemCount[product.id] = product.cartCount;
      this.cartItemCountTotal += product.cartCount;
    })


    // this.cartListStorage = JSON.parse(localStorage.getItem('cartList'));

    // this.cartListStorage.forEach(element => {
    //     this.cartCountItem = element.cartCount;
    //     this.totalCartCount = this.totalCartCount + element.cartCount;
    //     this.totalPriceItems = this.totalPriceItems + (element.cartCount * element.price)
    // });
  }

  public updateCart(value){    
    if(value){
      this.total[value.productId] = value.total;
      this.cartItemCount[value.productId] = value.soldQuantity;
      this.grandTotal = 0;
      this.total.forEach(price=>{
        this.grandTotal += price;
      });
      this.cartItemCountTotal = 0;
      this.cartItemCount.forEach(count=>{
        this.cartItemCountTotal +=count;
      });
     
      this.appService.Data.totalPrice = this.grandTotal;
      this.appService.Data.totalCartCount = this.cartItemCountTotal;

      this.cartListStorage.forEach(product=>{
        this.cartItemCount.forEach((count,index)=>{
          if(product.id == index){
            product.cartCount = count;
          }
        });
      });
      
    }
  }

  public remove(product) {
    const index: number = this.cartListStorage.indexOf(product);
    if (index !== -1) {
      this.cartListStorage.splice(index, 1);
      this.grandTotal = this.grandTotal - this.total[product.id]; 
      this.appService.Data.totalPrice = this.grandTotal;       
      this.total.forEach(val => {
        if(val == this.total[product.id]){
          this.total[product.id] = 0;
        }
      });

      this.cartItemCountTotal = this.cartItemCountTotal - this.cartItemCount[product.id]; 
      this.appService.Data.totalCartCount = this.cartItemCountTotal;
      this.cartItemCount.forEach(val=>{
        if(val == this.cartItemCount[product.id]){
          this.cartItemCount[product.id] = 0;
        }
      });
      this.appService.resetProductCartCount(product);
    }     
    localStorage.setItem('cartList', JSON.stringify(this.cartListStorage));
  }

  public clear(){
    this.cartListStorage.forEach(product=>{
      this.appService.resetProductCartCount(product);
    });
    this.cartListStorage.length = 0;
    this.appService.Data.totalPrice = 0;
    this.appService.Data.totalCartCount = 0;
    localStorage.setItem('cartList', JSON.stringify(this.cartListStorage));
  } 

  public checkCartAvailability(){
      if (!this.cartListStorage || this.cartListStorage.length==0)
       {return false}
       else {
         return true
       }
  }
}
