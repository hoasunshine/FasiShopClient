import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ShoppingCart} from '../model/shoppingCart';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private url = 'http://localhost:8080/order';

  public options = {headers: new HttpHeaders().set('Authorization', '1')};

  constructor(private http: HttpClient) {

  }

  createOrder(shoppingCart: ShoppingCart) {
    const ob = JSON.stringify(shoppingCart);
    console.log(ob);
    return this.http.post(this.url, ob, {
      headers: {'Content-Type': 'application/json'}
    });
  }
}
