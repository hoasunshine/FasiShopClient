import {Category} from './category';
import {Images} from './images';

export class Product {
  productId: string;
  productName: string;
  categoryId: string;
  productPrice: string;
  description: string;
  imageProduct: string;
  status:string;
  accountId:number;
  category: Category;
  images:Images;
}
