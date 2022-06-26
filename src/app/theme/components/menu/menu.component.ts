import { Component, OnInit, Input} from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/shared/services/products.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  allCategories: [];
  sub: Subscription[] = [];
  
  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.getAllCategories();
   }

  openMegaMenu(){
    let pane = document.getElementsByClassName('cdk-overlay-pane');
    [].forEach.call(pane, function (el) {
        if(el.children.length > 0){
          if(el.children[0].classList.contains('mega-menu')){
            el.classList.add('mega-menu-pane');
          }
        }        
    });
  }

  getAllCategories() {
    this.productService.getAllCategories(0, 10).subscribe(response => {
      this.allCategories = response['result'];
    })
  }

  ngOnDestroy(): void {
    this.sub.forEach(el => {
      el.unsubscribe();
    })
  }

}
