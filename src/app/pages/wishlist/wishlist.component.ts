import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from '../../app.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  public quantity: number = 1;
  // whishlistProducts: any = 0;
  wishlistLenght: number = 0;
  sub: Subscription[] = []
  constructor(public appService:AppService, public snackBar: MatSnackBar, public productService: ProductsService) { }

  ngOnInit() {
    // this.appService.Data.cartList.forEach(cartProduct=>{
    //   this.appService.Data.wishList.forEach(product=>{
    //     if(cartProduct.id == product.id){
    //       product.cartCount = cartProduct.cartCount;
    //     }
    //   });
    // });
    // ** run function getWhishlist()
    this.getWhishlist();
    // console.log('from wishlist component ', this.productService.whishlistProducts);    
  }

  public clear(){
    this.appService.Data.wishList.length = 0;
  } 

  // public getQuantity(val){
  //   this.quantity = val.soldQuantity;
  // }

  // public addToCart(product:Product){
  //   let currentProduct = this.appService.Data.cartList.filter(item=>item.id == product.id)[0];
  //   if(currentProduct){
  //     if((currentProduct.cartCount + this.quantity) <= product.availibilityCount){
  //       product.cartCount = currentProduct.cartCount + this.quantity;
  //     }
  //     else{
  //       this.snackBar.open('You can not add more items than available. In stock ' + product.availibilityCount + ' items and you already added ' + currentProduct.cartCount + ' item to your cart', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
  //       return false;
  //     }
  //   }
  //   else{
  //     product.cartCount = this.quantity;
  //   }
  //   this.appService.addToCart(product);
  // } 
  
  // ** Get All Whishlist
  getWhishlist() {
    // this.sub.push(
    //   this.productService.getWhishlist().subscribe(response => {
    //     this.whishlistProducts = response['result'];
    //     console.log('whislist items: ', response);
    //   })
    // );
    // this.productService.getWhishlist();
    this.productService.getWhishlist();
  }

  // ** Remove whislist product
  removeWhishlist(id: number) {
    // this.sub.push(
    //   this.productService.removeWhishlist(id).subscribe(response => {
    //     const removeRes = this.whishlistProducts.filter(product => {
    //        return product.productId !== id;
    //     })
    //     this.whishlistProducts = removeRes;
    //     localStorage.setItem('whishlist', JSON.stringify(this.whishlistProducts));
    //   })
    // );
    this.productService.removeWhishlist(id)
  }

  ngOnDestroy(): void {
    this.sub.forEach(e => {
      e.unsubscribe();
    })
  }

}