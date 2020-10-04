import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Accounts} from '../model/account';
import {BehaviorSubject, Observable} from 'rxjs';
import {Product} from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private url = 'http://localhost:8080/products';
  private url4 = 'http://localhost:8080/products/getListProductById';
  private url2 = 'http://localhost:8080/warehouse';
  private url3 = 'http://localhost:8080/commentRating/getListByProductId';
  private url5 = 'http://localhost:8080/accounts';
  private url6 = 'http://localhost:8080/products/listImage';
  private category = 'http://localhost:8080/categories';
  private getProductByCategory = 'http://localhost:8080/products/getProductByCategoryId';


  public currentUser: Observable<Accounts>;


  products: Product[];

  constructor(private http: HttpClient) {
  }


  public options = {headers: new HttpHeaders().set('Authorization', '1')};

  load() {
    return this.http.get(this.url, this.options);
  }

  // filterByCategory(categoryId: string) {
  //   let body = new HttpParams();
  //   body = body.set('categoryId', categoryId);
  //   // @ts-ignore
  //   this.http.get(this.getProductByCategory, body).subscribe((item: any) => {
  //     this.products = item.data.productDTOList;
  //     alert(this.products);
  //   });
  // }

  detail(id: string) {
    return this.http.get(`${this.url}/${id}`, this.options);
  }

  getListImageByProductId(id: string) {
    return this.http.get(`${this.url6}/${id}`, this.options);
  }

  getCategory() {
    return this.http.get(this.category, this.options);
  }

  warehouseByProductId(id: string) {
    return this.http.get(`${this.url2}/${id}`, this.options);
  }

  commentRating(id: string) {
    return this.http.get(`${this.url3}/${id}`, this.options);
  }


  getAllProductByAccoutnId(id: string) {
    return this.http.get(`${this.url4}/${id}`, this.options);
  }

  getAccount(id: string) {
    return this.http.get(`${this.url5}/${id}`, this.options);
  }

}
