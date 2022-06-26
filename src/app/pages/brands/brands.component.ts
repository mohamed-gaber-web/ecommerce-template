import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit, OnDestroy {
  
  public letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","V","W","Y","Z"];
  public brands = [];
  public searchText: string;
  sub: Subscription[] = [];
  isLoading = false;
  constructor(public appService:AppService) { }

  ngOnInit() {

    this.isLoading = true;
    this.sub.push(
      this.appService.getBrands()
      .subscribe(response => {        
        this.isLoading = false;
        this.brands = response['result'];
      })
    )
    
    // this.brands.sort((a, b)=>{
    //   if(a.name < b.name) return -1;
    //   if(a.name > b.name) return 1;
    //   return 0;
    // });
  }

  ngOnDestroy() {
    this.sub.forEach(i => {
      i.unsubscribe();
    })
  }

}
