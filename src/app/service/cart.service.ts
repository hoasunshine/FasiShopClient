import {Injectable} from '@angular/core';
import {Cart} from '../model/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  items = [];
  local = [];
  getLocal = [];
  getTotalLateUpdate = [];
  getTotalLateUpdate2 = [];
  arrayCartItem: Cart[];
  cart1: Cart = new Cart();
  arrayAfterRemove: Cart[];

  constructor() {
  }

  addToCart(cart: Cart) {
    this.getLocal = JSON.parse(localStorage.getItem('cart'));
    this.arrayCartItem = JSON.parse(localStorage.getItem('cart'));
    if (this.arrayCartItem != null) {
      for (let i = 0; i < this.arrayCartItem.length; i++) {
        if (cart.productId == this.arrayCartItem[i].productId && cart.property === this.arrayCartItem[i].property) {
          this.getTotalLateUpdate2.push(cart);
        }
      }
    }
    console.log('a' + this.getTotalLateUpdate2);
    console.log(this.getLocal);
    if (this.getLocal == null) {
      // @ts-ignore
      cart.totalPrice = cart.productPrice * cart.quantity;
      this.items.push(cart);
      localStorage.setItem('cart', JSON.stringify(this.items));
    } else {
      console.log(this.arrayCartItem);
      this.local = JSON.parse(localStorage.getItem('cart')).filter(function(node) {
        return node.productId == cart.productId;
      });
      this.cart1 = this.local[0];
      this.arrayCartItem = JSON.parse(localStorage.getItem('cart'));
      if (this.cart1 != undefined) {
        if (this.getTotalLateUpdate2.length > 0) {
          alert('Product already exists please update quantity !!!');
        } else {
          this.getTotalLateUpdate = JSON.parse(localStorage.getItem('cart'));
          // @ts-ignore
          cart.totalPrice = cart.productPrice * cart.quantity;
          this.getTotalLateUpdate.push(cart);
          localStorage.setItem('cart', JSON.stringify(this.getTotalLateUpdate));
        }
      } else {
        this.getTotalLateUpdate = JSON.parse(localStorage.getItem('cart'));
        // @ts-ignore
        cart.totalPrice = cart.productPrice * cart.quantity;
        this.getTotalLateUpdate.push(cart);
        localStorage.setItem('cart', JSON.stringify(this.getTotalLateUpdate));
      }
    }
  }

  changeQuantityMinus(id: string, i: number, property: string) {
    this.items = JSON.parse(localStorage.getItem('cart')).filter(x => x.productId == id && x.property == property);
    this.cart1 = this.items[0];
    this.cart1.quantity -= 1;
    if (this.cart1.quantity <= 0) {
      alert('Invalid quantity !!!');
    } else {
      // @ts-ignore
      this.cart1.totalPrice = this.cart1.quantity * this.cart1.productPrice;
      console.log(this.cart1);
      this.arrayCartItem = JSON.parse(localStorage.getItem('cart'));
      this.arrayCartItem.splice(i, 1);
      this.arrayCartItem.push(this.cart1);
      localStorage.setItem('cart', JSON.stringify(this.arrayCartItem));
    }
  }

  changeQuantityPlus(id: string, i: number, property: string) {
    this.items = JSON.parse(localStorage.getItem('cart')).filter(x => x.productId == id && x.property == property);
    this.cart1 = this.items[0];
    this.cart1.quantity += 1;
    if (this.cart1.quantity <= 0) {
      alert('Invalid quantity !!!');
    } else {
      // @ts-ignore
      this.cart1.totalPrice = this.cart1.quantity * this.cart1.productPrice;
      console.log(this.cart1);
      this.arrayCartItem = JSON.parse(localStorage.getItem('cart'));
      this.arrayCartItem.splice(i, 1);
      this.arrayCartItem.push(this.cart1);
      localStorage.setItem('cart', JSON.stringify(this.arrayCartItem));
    }
  }

  removeItem(id: string, property: string, i: number) {
    this.arrayCartItem = JSON.parse(localStorage.getItem('cart'));
    this.arrayCartItem.splice(i, 1);
    console.log(this.arrayCartItem);
    localStorage.setItem('cart', JSON.stringify(this.arrayCartItem));
  }

  getItems() {
    this.items = JSON.parse(localStorage.getItem('cart'));
    return this.items;
  }

  clearCart() {
    this.items = JSON.parse(localStorage.getItem('cart'));
    this.items = null;
    return localStorage.setItem('cart', JSON.stringify(this.items));
  }
}
