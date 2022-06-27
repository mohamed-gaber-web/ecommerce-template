import { Component, OnInit, ViewChild, HostListener, SimpleChanges, AfterViewInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from '../../shared/products-carousel/product-dialog/product-dialog.component';
import { AppService } from '../../app.service';
import { Product, Category } from "../../app.models";
import { Settings, AppSettings } from 'src/app/app.settings';
import { ProductsService } from 'src/app/shared/services/products.service';
import { UiService } from 'src/app/shared/services/ui.service';
import { FilterProductsService } from 'src/app/shared/filter-products.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) sidenav: any;
  public cats:any[]=[];
  public sidenavOpen:boolean = true;
  private sub:Subscription[]=[];
  public viewType: string = 'list';
  public viewCol: number = 25;
  public counts = [12, 24, 36];
  public count:any;
  public sortings = ['Sort By Default', 'Lowest first', 'Highest first'];
  public sort:any;
  public products: Array<Product> = [];
  public categories:Category[];
  public brands = [];
  filterProductsByCategory: [];
  public priceFrom: number = 750;
  public priceTo: number = 1599;
  public searchInput:string=' ';
  public sortName="";
  private checkedArray:number[]=[];
  public colors = [
    { name: "#5C6BC0", selected: false },
    { name: "#66BB6A", selected: false },
    { name: "#EF5350", selected: false },
    { name: "#BA68C8", selected: false },
    { name: "#FF4081", selected: false },
    { name: "#9575CD", selected: false },
    { name: "#90CAF9", selected: false },
    { name: "#B2DFDB", selected: false },
    { name: "#DCE775", selected: false },
    { name: "#FFD740", selected: false },
    { name: "#00E676", selected: false },
    { name: "#FBC02D", selected: false },
    { name: "#FF7043", selected: false },
    { name: "#F5F5F5", selected: false },
    { name: "#696969", selected: false }
  ];
  public sizes = [
    { name: "S", selected: false },
    { name: "M", selected: false },
    { name: "L", selected: false },
    { name: "XL", selected: false },
    { name: "2XL", selected: false },
    { name: "32", selected: false },
    { name: "36", selected: false },
    { name: "38", selected: false },
    { name: "46", selected: false },
    { name: "52", selected: false },
    { name: "13.3\"", selected: false },
    { name: "15.4\"", selected: false },
    { name: "17\"", selected: false },
    { name: "21\"", selected: false },
    { name: "23.4\"", selected: false }
  ]; 
  public isLoading:boolean=false;
  public page:any;
  public settings: Settings;
  constructor(public appSettings: AppSettings,
              public productService: ProductsService,
              private activatedRoute: ActivatedRoute, 
              public appService:AppService, 
              public dialog: MatDialog, 
              private router: Router,
              private activeRouter:ActivatedRoute,
              private uiService: UiService,
  private filterProducts: FilterProductsService) {
    this.settings = this.appSettings.settings;
    this.activeRouter.params.subscribe(p=>{
      this.checkSorting(p.sort)
      this.sortName=p.sort;
      
      
     
    })
  }
  
 
 
  ngOnInit() {
    this.sub.push(
      this.activatedRoute.queryParams.subscribe(s=>{
          this.searchInput=s['q'];
          if(s['q']==="" || !s['q'] || s['q']===" ")

          {
            this.searchInput="All"
            this.getEveryProduct();}

          else {
          this.getAllProducts(s['q']);}
          
        }));
    this.count = this.counts[0];
    this.sort = this.sortings[0];
   
    if(window.innerWidth < 960){
      this.sidenavOpen = true;
    };
    if(window.innerWidth < 1280){
      this.viewCol = 33.3;
    };
    
    this.getCategories();
    this.getBrands();
  }
 
  

  private getAllProducts(s:string){
    this.isLoading=true;
    this.sub.push(
    this.productService.getProductBySearch(s).subscribe(response => {
      this.products=response['result'];
       this.cats = this.getSubCategories(response['result']);
      this.isLoading=false;
    }))
  }

  private getEveryProduct(){
    this.isLoading=true;
    this.sub.push(
    this.productService.getAllProducts().subscribe(response => {
      this.products=response['result'];
       this.cats = this.getSubCategories(response['result']);
      this.isLoading=false;
    }))
  }
  public ascend(num:Product[]){
   let arr= num.sort((a, b) => {
    if(a.price === b.price) {
      // If two elements have same number, then the one who has larger rating.average wins
      return b.price- a.price;
    } else {
      // If two elements have different number, then the one who has larger number wins
      return a.price - b.price;
    }
  });
  }
  public descend(num:Product[]){
    let arr= num.sort((a, b) => {
     if(a.price === b.price) {
       // If two elements have same number, then the one who has larger rating.average wins
       return a.price- b.price;
     } else {
       // If two elements have different number, then the one who has larger number wins
       return b.price - a.price;
     }
   });
   }


  public checkSorting(s:string){
    if(s==="Best match"){
      this.getAllProducts(s['q']);
    }
    else if(s==="Sort-by-default" ||s==="" ||!s ){
this.getAllProducts(s['q']);
   }
    else if(s==="Lowest first")
    {
      this.ascend(this.products);
    }
    else if(s==='Highest first'){
      this.descend(this.products)
    }
    else{
      this.getAllProducts(s['q']);
    }
  }

 

  public getCategories(){  
    if(this.appService.Data.categories.length == 0) { 
      this.sub.push(
      this.appService.getCategories().subscribe(data => {
        this.categories = data['result'];
        this.appService.Data.categories = data['result'];

      }))
    }
    else{
      this.categories = this.appService.Data.categories;
    }
  }

  public getBrands(){
   this.appService.getBrands().subscribe(response => {
     this.brands = response['result']
   });
    this.brands.forEach(brand => { brand.selected = false });
  }

 
  @HostListener('window:resize')
  public onWindowResize():void {
    (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
    (window.innerWidth < 1280) ? this.viewCol = 33.3 : this.viewCol = 25;
  }

  public changeCount(count){
    this.count = count;
    // this.getAllProducts(this.searchInput); 
  }

  public changeSorting(sort){
    let navigationExtras: NavigationExtras = {
      queryParams: { q : this.searchInput }
    };
    this.router.navigate(['/products/'+sort],navigationExtras)
  }

  public changeViewType(viewType, viewCol){
    this.viewType = viewType;
    this.viewCol = viewCol;
  }

  public openProductDialog(product){   
    let dialogRef = this.dialog.open(ProductDialogComponent, {
        data: product,
        panelClass: 'product-dialog',
        direction: (this.settings.rtl) ? 'rtl' : 'ltr'
    });
    dialogRef.afterClosed().subscribe(product => {
      if(product){
        this.router.navigate(['/products', product.id, product.name]); 
      }
    });
  }

  public onPageChanged(event){
      this.page = event;
      this.getAllProducts(this.searchInput); 
      window.scrollTo(0,0); 
  }

  public onChangeCategory(data){
      this.router.navigate(['/products/products-category/'+data]); 
    
  }
  public checkPriceRange(){
    if(this.priceFrom>this.priceTo || this.priceTo<this.priceFrom)
     {return false;}
    else {return true;}
  }

  onChangePrice() {
    this.uiService.showLoadingBar();
    this.isLoading=true;
    this.sub.push(
    this.filterProducts.filterProductsByPrice(this.priceFrom, this.priceTo)
    .subscribe(response => {
      this.uiService.hideLoadingBar();
      this.isLoading=false;
      this.products = response['result'];      
    }))
  }
 public onReset(){
    this.uiService.showLoadingBar();
    this.getAllProducts(this.searchInput);
    
  }
  public getSubCategories(s:any[]):any[]{
    s.forEach(element=>{
      let objj = {name:element.productCategory,
        value:element.productCategoryId};
          if(this.cats.length > 0){
              if(this.cats.includes(objj)){
                return;
              }
              else{
                this.cats.push(objj)
              }
         }
          else {
             this.cats.push(objj)}
        // for(var i=0;i=this.cats.length;i++){
        //   if(this.cats[i]===objj)
        //   else{ 
        //     this.cats.push(objj)
        // }
    })
    const ids = this.cats.map(o => o.value)
    const filtered = this.cats.filter(({value}, index) => !ids.includes(value, index + 1))
    return filtered;
  }

  public checkChangedCategories($event,id:number):void{
    if($event.checked===true)
    { this.checkedArray.push(id);
  }

    else if($event.checked===false) 

    {this.checkedArray=this.checkedArray.filter((value)=>
      {return value!==id})

   }
    this.filterProductsBySpecificCategories(this.checkedArray);
  }

  private filterProductsBySpecificCategories(arr:number[]):void{
    this.isLoading=true;
    this.sub.push(
    this.productService.getProductBySearchAndSubs(this.searchInput,arr).subscribe(res=>{
      this.products=res['result'];
      this.isLoading=false;
    }));
  }

  ngOnDestroy() {
    this.sub.forEach(s=>s.unsubscribe())
  }

}
