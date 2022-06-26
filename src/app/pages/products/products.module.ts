import { ProductResolver } from './product/product.resolve';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module';
import { PipesModule } from '../../theme/pipes/pipes.module';
import { ProductsComponent } from './products.component';
import { ProductComponent } from './product/product.component';
import { ProductZoomComponent } from './product/product-zoom/product-zoom.component';
import { ProductCategoryComponent } from './product-category/product-category.component';
// import { ProductDetailsComponent } from './product/product-details/productDetails.component';




export const routes = [
  { path: ':sort', component: ProductsComponent, pathMatch: 'full',data: { breadcrumb: 'Products by search' } },
  { path: 'product/:id', component: ProductComponent,data: { breadcrumb: 'Product' } ,
  resolve: {
      productResolve: ProductResolver
  } },
  { path: 'products-category/:catId/:sort', component: ProductCategoryComponent ,data: { breadcrumb: 'Products by category' }}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SwiperModule,
    NgxPaginationModule,
    SharedModule,
    PipesModule,

  ],
  declarations: [
    ProductsComponent, 
    ProductComponent, 
    ProductZoomComponent, 
    ProductCategoryComponent
  ],
  entryComponents:[
    ProductZoomComponent
  ]
})
export class ProductsModule { }
