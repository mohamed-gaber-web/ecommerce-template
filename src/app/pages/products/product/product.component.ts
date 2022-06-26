import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SwiperConfigInterface, SwiperDirective } from 'ngx-swiper-wrapper';
import { Data, AppService } from '../../../app.service';
import { emailValidator } from '../../../theme/utils/app-validators';
import { ProductZoomComponent } from './product-zoom/product-zoom.component';
import { ProductsService } from 'src/app/shared/services/products.service';
import { Product } from 'src/app/shared/models/product';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/shared/services/storage.service';
import { tap } from 'rxjs/operators';
import { UiService } from 'src/app/shared/services/ui.service';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @ViewChild('zoomViewer', { static: true }) zoomViewer;
  @ViewChild(SwiperDirective, { static: true }) directiveRef: SwiperDirective;
  public config: SwiperConfigInterface={};
  public product: Product;
  public image: any;
  public zoomImage: any;
  private sub: any;
  public form: FormGroup;
  public relatedProducts: Array<Product>;
  id: number;
  isLoading = false;

  constructor(
  
    public appService:AppService, 
    public productsService: ProductsService,
    public activatedRoute: ActivatedRoute, 
    public dialog: MatDialog, 
    public formBuilder: FormBuilder,
    public translate: TranslateService,
    private storageService: StorageService,
    public uiService: UiService) {  }

  ngOnInit() {   
    this.getProductById(this.id);

    this.sub = this.activatedRoute.data
      .subscribe(productId => this.id = +productId['id'])

    this.form = this.formBuilder.group({ 
      'review': [null, Validators.required],            
      'name': [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': [null, Validators.compose([Validators.required, emailValidator])]
    }); 
    // this.getRelatedProducts();  
    this.sub = this.translate.onLangChange
        .pipe(
          tap((res: any) => {
            const flag = this.storageService.getFlag(res.lang);
            this.storageService.setLanguage(flag);
            this.getProductById(this.id);
            location.reload()
          })
        )
        .subscribe()
  }

  ngAfterViewInit(){
    this.config = {
      observer: false,
      slidesPerView: 4,
      spaceBetween: 10,      
      keyboard: true,
      navigation: true,
      pagination: false,       
      loop: false, 
      preloadImages: false,
      lazy: true, 
      breakpoints: {
        480: {
          slidesPerView: 2
        },
        600: {
          slidesPerView: 3,
        }
      }
    }
  }

  public getProductById(id: number){
    
    
    this.uiService.showLoadingBar();
    this.activatedRoute.data.subscribe( data => {      
      // productCategoryId
      
      this.uiService.hideLoadingBar();
      this.product = data.productResolve['result'];
      data.productResolve['result'].imagePaths.forEach(element => {
        this.image = element;
      });
      data.productResolve['result'].imagePaths.forEach(elementZoom => {
        this.zoomImage = elementZoom
       });
      setTimeout(() => { 
        this.config.observer = true;
       // this.directiveRef.setIndex(0);
      });
    });
    
  }

  // public getRelatedProducts(){
  //   this.appService.getProducts('related').subscribe(data => {
  //     this.relatedProducts = data;
  //   })
  // }

  public selectImage(image){
    this.image = image;
    this.zoomImage = image;
  }

  public onMouseMove(e){
    if(window.innerWidth >= 1280){
      var image, offsetX, offsetY, x, y, zoomer;
      image = e.currentTarget; 
      offsetX = e.offsetX;
      offsetY = e.offsetY;
      x = offsetX/image.offsetWidth*100;
      y = offsetY/image.offsetHeight*100;
      zoomer = this.zoomViewer.nativeElement.children[0];
      if(zoomer){
        zoomer.style.backgroundPosition = x + '% ' + y + '%';
        zoomer.style.display = "block";
        zoomer.style.height = image.height + 'px';
        zoomer.style.width = image.width + 'px';
      }
    }
  }

  public onMouseLeave(event){
    this.zoomViewer.nativeElement.children[0].style.display = "none";
  }

  public openZoomViewer(){
    this.dialog.open(ProductZoomComponent, {
      data: this.zoomImage,
      panelClass: 'zoom-dialog'
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  } 

  public onSubmit(values:Object):void {
    if (this.form.valid) {
      //email sent
    }
  }

  public shareProduct(){
    const navigator = window.navigator as any;

    if (navigator.share) {
      navigator
        .share({
          title: this.product.productTranslations[0].title,
          text: this.product.productTranslations[0].description,
          url: window.location.href
        })
        .then(() => alert('Successful share'))
        .catch(error => alert('Error sharing'+ error));
    } else {
      alert('share not supported');
    }  }

    public facebookShare(){
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`)
    }

  
}