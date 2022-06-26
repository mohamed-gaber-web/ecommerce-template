import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss']
})
export class BannersComponent implements OnInit {
  @Input('banners') banners: Array<any> = [];

  constructor(private router:Router) { }

  ngOnInit() { }

  public getBanner(index){
    return this.banners[index];


  }

  public getBgImage(index){
    let bgImage = {
      'background-image': index != null ? "url(" + this.banners[index].imagePath + ")" : "url(https://via.placeholder.com/600x400/ff0000/fff/);",
    };
    return bgImage;
  } 

  public exploreCategory(_id){
      this.router.navigateByUrl(`/main-categories/${_id}`);
  }

}
