import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { getAllCategory } from '../../shared/api/api';
import { Subscription } from 'rxjs';
import { AppService } from 'src/app/app.service';
import { ProductsService } from 'src/app/shared/services/products.service';
import { ActivatedRoute, Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-main-categories',
  templateUrl: './main-categories.component.html',
  styleUrls: ['./main-categories.component.scss']
})
export class MainCategoriesComponent implements OnInit,OnDestroy {
  // public smartHome:boolean=false;
  // public AV:boolean=false;
  // public TV_Lifts:boolean=false;
  // public specialTVs:boolean=false;
  // public motorizedGates:boolean=false;
  public slides:[]=[];
  public sub: Subscription[] = [];
  private mainCategoryID=0;
  public mainCategories: []=[];
   public children:[]=[];
 public isLoading:boolean;
public prds:[]=[];

  constructor(
    public appService:AppService,
    private productsService: ProductsService,
    private router:ActivatedRoute,
    private route:Router,
  ) {
   this.router.params.subscribe(p=>{
     this.mainCategoryID=p.id
   })
   }

  ngOnInit(): void {
    this.getSliders();
    this.getSubCategories(this.mainCategoryID);    
  }

  public getSliders(){
    this.sub.push(
      this.appService.getSliders()
      .subscribe(response => {
        this.slides = response['result'].reverse();
      })
    )
  }




  public getSubCategories(id:number){
    this.isLoading=true;
    this.sub.push(this.productsService.getProductBySubCategory(id)
    .subscribe(res=>{
        this.children=res['result'].children;
        this.isLoading=false;
    }))
  }

  public exploreCategory(id:number){
    this.route.navigate([`/products/products-category/${id}/Sort By Default`]);
  }
  ngOnDestroy(): void {
    this.sub.forEach(s=>s.unsubscribe())
  }
}
