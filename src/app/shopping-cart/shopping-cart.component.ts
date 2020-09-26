import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {ShopService} from '../service/shop.service';
import {CartService} from '../service/cart.service';
import {Cart} from '../model/cart';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart: Cart[];
  total: string;
  price: [];
  id: string;
  cartItem: Cart = new Cart();

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private cartService: CartService) {

  }

  ngOnInit(): void {

    this.cart = JSON.parse(localStorage.getItem('cart'));
    // @ts-ignore
    this.price = this.cart.totalPrice;
    console.log(this.price);
    console.log(this.cart);

  }

  changeQuantityMinus(id: string) {

    // @ts-ignore
    this.cartItem = this.cartService.changeQuantityMinus(id);
  }

  changeQuantityPlus(id: string) {
    // @ts-ignore
    this.cartItem = this.cartService.changeQuantityPlus(id);
  }

  remove(id: string) {
    this.cartService.removeItem(id);
    window.location.reload();
  }


}
