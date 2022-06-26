export class Product {
    id: number;
    order: number;
    price: number;
    discount: number;
    quantity: number;
    imagePath: string;
    productCategory: string;
    imagePaths: [];
    productCategoryId: number;
    brandId: number;
    isPercentage: boolean;
    priceAfterDiscount: number;
    sku:number;
    brandName:string;
    mainCategoryName:string;
    mainCategoryId:number;    
    productTranslations: [{
        id?: number,
        title: string,
        description: string
    }]
}