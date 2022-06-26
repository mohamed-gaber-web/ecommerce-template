import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { Data, AppService } from '../../app.service';
import { Product } from "../../app.models";
import { Settings, AppSettings } from 'src/app/app.settings';
import { StorageService } from '../services/storage.service';
import { ProductsService } from '../services/products.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products-carousel',
  templateUrl: './products-carousel.component.html',
  styleUrls: ['./products-carousel.component.scss']
})
export class ProductsCarouselComponent implements OnInit {

  whishlistList: any = []

  @Input('products') products: Array<Product> = [];
  public config: SwiperConfigInterface = {};
  public settings: Settings;
  @Input() loading: boolean;
  constructor(
    public appSettings:AppSettings, 
    public appService:AppService, 
    public dialog: MatDialog, 
    private router: Router,
    public storageService: StorageService,
    public productService: ProductsService,
    public snackBar: MatSnackBar
  ) { 
    this.settings = this.appSettings.settings;
  }

  ngOnInit() { 
  }
  
  ngAfterViewInit(){

    this.config = {
      observer: true,
      slidesPerView: 1,
      spaceBetween: 16,       
      keyboard: true,
      navigation: true,
      pagination: false,
      // grabCursor: true,        
      loop: false,
      preloadImages: true,
      lazy: true,  
      breakpoints: {
        480: {
          slidesPerView: 1
        },
        740: {
          slidesPerView: 2,
        },
        960: {
          slidesPerView: 3,
        },
        1280: {
          slidesPerView: 4,
        },
        1500: {
          slidesPerView: 5,
        }
      }
    }
  }

  public openProductDialog(product) {   
    
    let dialogRef = this.dialog.open(ProductDialogComponent, {
        data: product,
        panelClass: 'product-dialog',
        direction: (this.settings.rtl) ? 'rtl' : 'ltr'
    });
    dialogRef.afterClosed().subscribe(product => {
      if(product){
        this.router.navigate(['/products', product.id, product.title]); 
      }
    });
  }

  createWhishlist(productId: number,productTitle:string) {
    this.productService.createWhishlist(productId,productTitle);

  }

}