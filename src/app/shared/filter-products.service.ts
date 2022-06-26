import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { searchItems } from './api/api';
import { Category } from '../app.models';

@Injectable({
  providedIn: 'root'
})
export class FilterProductsService {

  constructor(private http: HttpClient) { }

  // create filter products by category
  filterProductsByCategory(categoryId: any) {
    const params = `?ProductCategoryId=${categoryId}&Offset=0&Limit=10`;
    return this.http.get(`${searchItems}` + params)
  }

  // create filter products by category
  filterProductsByBrand(brandId: any) {
    const params = `?BrandId=${brandId}&Offset=0&Limit=10`;
    return this.http.get(`${searchItems}` + params)
  }

  // create filter products by price
  filterProductsByPrice(priceFrom: any, priceTo: any) {
    const params = `?PriceFrom=${priceFrom}&PriceTo=${priceTo}&Offset=0&Limit=10`;
    return this.http.get(`${searchItems}` + params)
  }

  public filterProductsByPriceAndCategory(priceFrom:any,priceTo:any,catID:number){
    console.log(catID)
    const params = `?ProductCategoryId=${catID}&PriceFrom=${priceFrom}&PriceTo=${priceTo}&Offset=0&Limit=10`;
    return this.http.get(`${searchItems}` + params)

  }
  filterProductsCategory(categoryId, brandId, priceFrom, priceTo) {

    const params = `
      ?ProductCategoryId=${categoryId}
      &BrandId=${brandId}
      &PriceFrom=${priceFrom}
      &PriceTo=${priceTo}
      &Offset=0&Limit=10`;
    return this.http.get(`${searchItems}` + params)
  }
}
