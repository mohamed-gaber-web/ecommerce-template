import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Product } from "../../app.models";
import { ProductsService } from 'src/app/shared/services/products.service';
import { map, tap } from 'rxjs/operators';
import { element } from 'protractor';
import { StorageService } from 'src/app/shared/services/storage.service';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { UiService } from 'src/app/shared/services/ui.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public slides: [] = []
  public brands = [];
  brandOffset: number = 0;
  brandLimit: number = 10;
  public banners = [];
  public featuredProducts: Array<Product>;
  public onSaleProducts: Array<Product>;
  public topRatedProducts: Array<Product>;
  public newArrivalsProducts: Array<Product>; 
  sub: Subscription[] = [];
  isLoading = false;


  constructor(
    public appService:AppService,
    public ps: ProductsService,
    public storageService: StorageService,
    public translate: TranslateService,
    public uiService: UiService) { 
      this.getSliders();

    }

  ngOnInit() {
  
    this.getBanners();
    this.getProducts("featured");
    this.getBrands();

    // Handle Language On Change 
    this.sub.push(
      this.translate.onLangChange
        .pipe(
          tap((res: any) => {
            const flag = this.storageService.getFlag(res.lang);
            this.storageService.setLanguage(flag);
            this.getSliders();
            this.getProducts();
            location.reload()
          })
        )
        .subscribe()
    );
  }

  public onLinkClick(e){
    this.getProducts(e.tab.textLabel.toLowerCase()); 
  }

  public getProducts(type?){
    
    // Featured Products
    if(type == "featured" && !this.featuredProducts){
      this.isLoading = true;
      this.uiService.showLoadingBar();
     this.sub.push(this.ps.getProducts('FeaturedProduct')
     .pipe(map(response => {

       Object.entries(response);
       this.uiService.hideLoadingBar();
       this.isLoading = false;  
      return response['result'];
      }))
      .subscribe((res) => {this.featuredProducts = res;})
     )}


     // On sale Products
    if(type == "on sale" && !this.onSaleProducts){
      
        this.uiService.showLoadingBar();
        this.isLoading = true;
        this.sub.push(this.ps.getProducts('OnSaleProduct').pipe(map(response => {
          Object.entries(response);
          this.isLoading = false;
          this.uiService.hideLoadingBar();
          return response['result'];
        }))
        .subscribe((res) => {
            this.onSaleProducts = res;
        })
      )}
    
    // Latest Products
    if(type == "new arrivals" && !this.newArrivalsProducts){
      this.uiService.showLoadingBar();
      this.isLoading = true;
      this.sub.push(this.ps.getProducts('LatestProduct').pipe(map(response => {
        Object.entries(response);
        this.isLoading = false;
        this.uiService.hideLoadingBar();
        return response['result'];
      }))
      .subscribe((res) => {
          this.newArrivalsProducts = res;
      })
      )}
  
  
    }

  public getBanners(){
    // this.appService.getBanners().subscribe(data=>{
    //   this.banners = data;
    // })

    this.appService.getCategories().subscribe(data=>{
      this.banners=data['result'];
    })
  }

  public getBrands(){
    this.isLoading = true;
    this.sub.push(
      this.appService.getBrands()
      .subscribe(response => {
        this.isLoading = false;
        this.brands = response['result'];      
      })
    )
  }

  public getSliders(){
    this.sub.push(
      this.appService.getSliders()
      .subscribe(response => {
        this.slides = response['result']; 
      })
    )
  }

  ngOnDestroy() {
    this.sub.forEach((sub) => sub.unsubscribe());
  }

}
