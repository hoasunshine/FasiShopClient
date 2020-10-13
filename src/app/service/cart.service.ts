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
  arrayCartItem = [];
  cart1: Cart = new Cart();

  constructor() {
  }

  addToCart(cart: Cart) {
    this.getLocal = JSON.parse(localStorage.getItem('cart'));
    console.log(this.getLocal);
    if (this.getLocal == null) {
      // @ts-ignore
      cart.totalPrice = cart.productPrice * cart.quantity;
      this.items.push(cart);
      localStorage.setItem('cart', JSON.stringify(this.items));
    }
    else {
      this.local = JSON.parse(localStorage.getItem('cart')).filter(function(node) {
        return node.productId == cart.productId;
      });
      this.cart1 = this.local[0];
      if (this.cart1 != undefined) {
        let products = JSON.parse(localStorage.getItem('cart')).filter(product => product.productId !== cart.productId);
        localStorage.setItem('cart', JSON.stringify(products));
        this.getTotalLateUpdate = JSON.parse(localStorage.getItem('cart'));
        //@ts-ignore
        cart.quantity += this.cart1.quantity;
        if (cart.quantity <= 0) {
          alert('So luong khong hop le !!!');
          window.location.reload();
        } else {
          //@ts-ignore
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
    // else {
    //   this.arrayCartItem = JSON.parse(localStorage.getItem('cart'));
    //   for (let i = 0; i < this.arrayCartItem.length; i++) {
    //     if (cart.property === this.arrayCartItem[i]) {
    //
    //     }
    //   }
    // }
  }

  changeQuantityMinus(id: string) {

    this.items = JSON.parse(localStorage.getItem('cart')).filter(x => x.productId == id);
    this.cart1 = this.items[0];
    this.cart1.quantity = -1;
    this.addToCart(this.cart1);
  }

  changeQuantityPlus(id: string) {

    this.items = JSON.parse(localStorage.getItem('cart')).filter(x => x.productId == id);
    this.cart1 = this.items[0];
    this.cart1.quantity = 1;
    this.addToCart(this.cart1);
  }

  removeItem(id: string) {
    let products = JSON.parse(localStorage.getItem('cart')).filter(product => product.productId !== id);
    localStorage.setItem('cart', JSON.stringify(products));
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
