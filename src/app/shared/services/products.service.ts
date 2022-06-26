import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ApiProducts, getProductByCategory,getSubCatogiresProducts,
     productDetails, getProductByBrand, removeWhishlist, getWhishlist, 
     createWhishlist, getAllCategory,getAllAds } from "../api/api";
import { Product } from "../models/product";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";



@Injectable({
    providedIn: 'root'
})
export class ProductsService {


    limit: number = 5;
    offset: number = 0;

    wishlistProdutsLength: number = 0;
    whishlistProducts: any;

    queryParams = `?Offset=${this.offset}&Limit=${this.limit}`

    constructor(private http: HttpClient, private snackBar: MatSnackBar) {
        this.getWhishlist();
     }
    
    getProducts(productQuery: string) {
        return this.http.get(`${ApiProducts}/${productQuery}` + this.queryParams);
    }

    getAllCategories(Offset: number, Limit: number) {
        return this.http.get(`${getAllCategory}?Offset=${Offset}&Limit=${Limit}`)
    }

    getProductById(id: number) {
        const params = `?id=${id}`;
        return this.http.get<Product>(`${productDetails}` + params);
    }

    getProductByCategory(catId: number, currentPage: number, orderPerPage: number) {
        // parseFloat(catId);
        const params = `?Offset=${currentPage}&limit=${orderPerPage}&categoryId=${catId}`;
        return this.http.get<Product>(`${getProductByCategory}` + params);
    }

    getProductBySubCategory(catId: number) {
        // const params = `?Offset=${currentPage}&limit=${orderPerPage}&categoryId=${catId}`;
        return this.http.get<Product>(`${getSubCatogiresProducts}`+`?id=${catId}`);
    }

    getProductByBrand(brandId: string) {
        const params = `?BrandId=${brandId}&Offset=0&Limit=10`;
        return this.http.get(`${getProductByBrand}` + params);
    }
    public getProductBySearch(searchTerm:string){
        const params = `?SearchTerm=${searchTerm}&Offset=0&Limit=10`;
        return this.http.get(`${getProductByBrand}`+params)
    }

    public getProductBySearchAndSubs(searchTerm:string,subsArray:number[]){
        const subs=`&ProductCategoryId=`
        let subsHeader="";
        subsArray.forEach(s=>{subsHeader+=subs+s;});
        const params = `?SearchTerm=${searchTerm}&${subsHeader}&Offset=0&Limit=10`;
        return this.http.get(`${getProductByBrand}`+params)
    }

  public  getAllProducts() {
        const params = `?Offset=0&Limit=5`;
        return  this.http.get(`${getProductByBrand}` + params);
    }

    public getProductsAds(limit:number) {
        
        return this.http.get(`${getAllAds}?limit=${limit}`)
    }
    createWhishlist(productId: number,productName:string) { 
        let productIdParam = `?productId=${productId}`;
        return this.http.post(`${createWhishlist}` + productIdParam, null).subscribe(response => {
            const resultSuccess = response['success'];
              if (resultSuccess === false) {
                // this.snackBar.open(response['arrayMessage'], 'x' , { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
                this.snackBar.open(`Sorry! ${productName} is already in your wishlist`, 'x' , { panelClass: 'error', verticalPosition: 'top', duration: 4000 });
              } else {
                this.wishlistProdutsLength = this.wishlistProdutsLength + 1             
                this.snackBar.open(productName+' has been added in whishlist', 'x' , { panelClass: 'success', verticalPosition: 'top', duration: 5000 });
              }
        })
    }

    getWhishlist() {
        let queryParams = `?Offset=${0}&Limit=${10}`
        return this.http.get(`${getWhishlist}` + queryParams).subscribe(response => {
            this.whishlistProducts = response['result'];
            this.wishlistProdutsLength = response['length'];
        })
    }

    removeWhishlist(pId: number) {
        let removeProductId = `?productId=${pId}`;
        return this.http.delete(`${removeWhishlist}` + removeProductId).subscribe(response => {
            
            const removeRes = this.whishlistProducts.filter(product => {          
                return product.productId !== pId;
            }) 
            this.whishlistProducts = removeRes;
            this.wishlistProdutsLength = this.wishlistProdutsLength - 1

            })
    }

}