import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Settings, AppSettings } from './app.settings';
import { ProductsService } from './shared/services/products.service';
import { StorageService } from './shared/services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loading: boolean = false;
  public settings: Settings;
  public ADs:any=[];
  public loadAds:boolean=null;
  public sideNavOpened:boolean=false;
  constructor(
    public appSettings:AppSettings, 
    public router: Router,
    translate: TranslateService,
    private storageService: StorageService,
    private productsServ:ProductsService,
    ){
    this.settings = this.appSettings.settings;
    translate.setDefaultLang('en-US');
    translate.use(this.storageService.getLang().code);
  }

  ngOnInit() {
    // this.getAds();
   // this.router.navigate(['']);  //redirect other pages to homepage on browser refresh 
  }

  ngAfterViewInit(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
          window.scrollTo(0,0);
      }
    })  
  }

  // public getAds():void{
  //   this.loadAds=true;
  //   this.productsServ.getProductsAds(4).subscribe((ad)=>{
  //     this.ADs=ad;
  //     this.loadAds=false;
  //   })
  // }
  
}
