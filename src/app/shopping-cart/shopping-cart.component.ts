// @ts-ignore
import {Component, OnInit} from '@angular/core';
// @ts-ignore
import {ActivatedRoute, Router} from '@angular/router';
// @ts-ignore
import {HttpClient} from '@angular/common/http';
import {CartService} from '../service/cart.service';
import {Cart} from '../model/cart';
import {log} from 'util';

// @ts-ignore
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart: Cart[];
  price: string;
  id: string;
  cartItem: Cart = new Cart();


  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private cartService: CartService) {

  }

  ngOnInit(): void {
    const arr = [];
    this.cart = JSON.parse(localStorage.getItem('cart'));
    // @ts-ignore
    for (let i = 0; i < this.cart.length; i++) {
      arr.push(this.cart[i].totalPrice);
      this.price = arr.reduce((a, b) => {
        return a + b;
      });
    }
    console.log(this.price);
  }

  changeQuantityMinus(id: string, i: number, property: string) {
    // window.location.reload();
    // @ts-ignore
    this.cartItem = this.cartService.changeQuantityMinus(id,i,property);
    window.location.reload();
  }

  changeQuantityPlus(id: string, i: number, property: string) {
    // window.location.reload();
    // @ts-ignore
    this.cartItem = this.cartService.changeQuantityPlus(id,i,property);
    window.location.reload();
  }

  remove(id: string, property: string, i: number) {
    this.cartService.removeItem(id, property,i);
    alert('Are you want delete ???');
    window.location.reload();
  }


  async ngAfterViewInit() {
    await this.loadScript('assets/js/jquery-3.3.1.min.js');
    await this.loadScript('assets/js/bootstrap.min.js');
    await this.loadScript('assets/js/jquery-ui.min.js');
    await this.loadScript('assets/js/jquery.countdown.min.js');
    await this.loadScript('assets/js/jquery.nice-select.min.js');
    await this.loadScript('assets/js/jquery.dd.min.js');
    await this.loadScript('assets/js/jquery.slicknav.js');
    await this.loadScript('assets/js/owl.carousel.min.js');
    await this.loadScript('assets/js/jquery.zoom.min.js');
    await this.loadScript('assets/js/main.js');
    await this.loadScript('assets/js/imagesloaded.pkgd.min.js');
  }

  loadScript(scriptUrl: string) {
    return new Promise(((resolve, reject) => {
      const scriptElement = document.createElement('script');
      scriptElement.src = scriptUrl;
      scriptElement.onload = resolve;
      document.body.appendChild(scriptElement);
    }));
  }


}
