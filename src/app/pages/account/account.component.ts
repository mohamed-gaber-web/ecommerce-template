import { Component, OnInit, ViewChild, HostListener, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/shared/services/products.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { CheckoutService } from '../checkout/checkout.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) sidenav: any;
  addressItems: any;
  sub: Subscription;
  public sidenavOpen:boolean = true;
  public links = [
    { name: 'Dashboard', href: 'dashboard', icon: 'dashboard' },
    { name: 'Information', href: 'information', icon: 'info' },
    { name: 'Addresses', href: 'addresses', icon: 'location_on' },
    { name: 'Orders History', href: 'orders', icon: 'add_shopping_cart' },
    { name: 'Refund', href: 'refund', icon: 'restored' },   
    // { name: 'Logout', href: '/sign-in', icon: 'power_settings_new' },    
  ];
  public linkTitle:string='My Account';
  constructor(public router:Router,
             public storageService: StorageService,
             public productService: ProductsService,
             public snackBar: MatSnackBar,


    ) { }

  ngOnInit() {
    if(window.innerWidth < 960){
      this.sidenavOpen = false;
    };
  }

  @HostListener('window:resize')
  public onWindowResize():void {
    (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
  }

  ngAfterViewInit(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { 
        if(window.innerWidth < 960){
          this.sidenav.close(); 
        }
      }                
    });
  }

  public signOut() {
    this.storageService.clearStorage();
    this.productService.wishlistProdutsLength = 0;
    this.productService.whishlistProducts = [];
    this.snackBar.open('You signed out successfully!', '×', {
      panelClass: 'success',
      verticalPosition: 'top',
      duration: 3000,
    });
    this.router.navigate(['/']);
  }
  public appendTitle(n:string){
    this.linkTitle=n;
  }
}
