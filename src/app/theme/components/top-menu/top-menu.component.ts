import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/pages/authentication/auth.service';
import { StorageService } from 'src/app/shared/services/storage.service';
import { Data, AppService } from '../../../app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Settings, AppSettings } from '../../../app.settings';
import { Router } from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import { ProductsService } from 'src/app/shared/services/products.service';




@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html'
})
export class TopMenuComponent implements OnInit {

  public currencies = ['USD', 'EUR'];
  public currency:any;
  public flags = [
    { name: 'English', image: 'assets/images/flags/gb.svg', code: 'en-US' },
    { name: 'Danish', image: 'assets/images/flags/denmark.svg', code: 'da-DA' },
    { name: 'العربية', image: 'assets/images/flags/ar.svg', code: 'ar-EG' },
  ];
  public flag: any;
  wishlistLenght: [];
  compareCount: [];

  public settings: Settings;
  constructor(
    public appSettings:AppSettings, 
    public appService:AppService, 
    public auth: AuthService,
    public storageService: StorageService,
    public snackBar: MatSnackBar,
    public router: Router,
    public productService: ProductsService,
    public translate: TranslateService) { 

    this.settings = this.appSettings.settings; 
  } 

  ngOnInit() {
    this.currency = this.currencies[0];    
    // ** get whishlist length
    
    this.flag = this.flags.find(
      (c) => c.name == this.storageService.getLang().name
    );


  }

  public changeCurrency(currency){
    this.currency = currency;
  }

  public changeLang(flag){
    this.flag = flag;
    this.translate.use(flag.code);

    this.storageService.setLang(flag);
    if (flag.name === 'العربية') {
      this.settings.rtl = true;
    } else {
      this.settings.rtl = false;
    }
  }

  // ** logout
  signOut() {
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

}
