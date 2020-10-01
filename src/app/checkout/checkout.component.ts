// @ts-ignore
import {Component, OnInit} from '@angular/core';
// @ts-ignore
import {ActivatedRoute, Router} from '@angular/router';
// @ts-ignore
import {HttpClient} from '@angular/common/http';
import {CartService} from '../service/cart.service';
import {Cart} from '../model/cart';
import {TransportersService} from '../service/transporters.service';
import {Transporters} from '../model/transporters';
import {CheckoutService} from '../service/checkout.service';
import {ShoppingCart} from '../model/shoppingCart';
import {CartInformation} from '../model/cartInformation';

// @ts-ignore
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit {

  cart: Cart[];
  transporter: Transporters[];
  shopping: ShoppingCart = new ShoppingCart();
  accountId: string;
  email: string;
  cartInformation: CartInformation = new CartInformation();
  mess: string;


  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private cartService: CartService, private transporters: TransportersService, private shoppingCart: CheckoutService) {
  }

  ngOnInit(): void {
    this.load();
    this.cart = JSON.parse(localStorage.getItem('cart'));
  }

  load() {
    this.transporters.load().subscribe((items: any[]) => {
      // @ts-ignore
      this.transporter = items.data.transportersDTOList;
      console.log(this.transporter);
    });
  }

  checkout() {
    this.shopping.list = this.cart;
    this.cartInformation.accountId = JSON.parse(localStorage.getItem('currentUser')).accountId;
    this.shopping.cartInformation = this.cartInformation;
    console.log(this.shopping);
    this.shoppingCart.createOrder(this.shopping).subscribe(
      (item: any) => {
        this.mess = item.message;
        console.log(this.mess);
        if (this.mess === 'Action Success') {
          alert('Success');
          this.cartService.clearCart();
          this.router.navigate(['/home']);
        } else if (this.mess === 'There are products with excess quantity in stock') {
          alert(this.mess);
          this.router.navigate(['/shopping-cart']);
        }else {
          alert('Err')
        }
      });
  }

  async ngAfterViewInit(){
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
    }))
  }

}
