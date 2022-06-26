export class Category {
  constructor(public id: number, 
              public name:string, 
              public hasSubCategory: boolean,
              public parentId: number){ }
}

export class Product {
  constructor(public id: number,
    public name: string,
    public imagePaths: Array<any>,
    public imagePath: string,
    public oldPrice: number,
    public price: number,
    public newPrice: number,
    public discount: number,
    public ratingsCount: number,
    public ratingsValue: number,
    public availibilityCount: number,
    public quantity: number,
    public productTranslations: {
                id: number;
                productId: number;
                title: string;
                description: string;
                languageName: string;
              },
              public cartCount: number,
              // public color: Array<string>,
              // public size: Array<string>,
              // public weight: number,
              public categoryId: number){ }
}
