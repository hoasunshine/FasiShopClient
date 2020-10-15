// @ts-ignore
import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ShopService} from '../service/shop.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HomeService} from '../service/home.service';
import {HotProduct} from '../model/hotProduct';
import {CheckoutService} from '../service/checkout.service';
import {ShoppingCart} from '../model/shoppingCart';
import {CartInformation} from '../model/cartInformation';
import {CartService} from '../service/cart.service';
import {Cart} from '../model/cart';

// @ts-ignore
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  hotProduct: HotProduct[];
  hotProductMen: HotProduct[];
  hotProductWomen: HotProduct[];
  amount: string;
  shopping: ShoppingCart = new ShoppingCart();
  cartInformation: CartInformation = new CartInformation();
  mess: string;
  cart: Cart[];

  constructor(private router: Router, private http: HttpClient, private cartService: CartService, private service: HomeService, private route: ActivatedRoute, private shoppingCart: CheckoutService) {
  }

  ngOnInit(): void {
    this.loadData();
    console.log(this.hotProductWomen);
    console.log(this.hotProductMen);
    this.cart = JSON.parse(localStorage.getItem('cart'));
    this.route.queryParams.subscribe(params => {
      this.amount = params.vnp_Amount;
    });
    console.log(this.amount);
    if (this.amount == JSON.parse(localStorage.getItem('amount'))) {
      if (JSON.parse(localStorage.getItem('currentUser')) === null) {
        alert('Please Login !!!');
        this.router.navigate(['/login']);
      } else {
        this.shopping.list = this.cart;
        this.cartInformation.accountId = JSON.parse(localStorage.getItem('currentUser')).accountId;
        this.cartInformation = JSON.parse(localStorage.getItem('cartInformation'));
        this.shopping.cartInformation = this.cartInformation;
        console.log(this.shopping);
        this.shoppingCart.createOrder(this.shopping).subscribe(
          (item: any) => {
            this.mess = item.message;
            console.log(this.mess);
            if (this.mess === 'Action Success') {
              alert('Payment Success');
              this.cartService.clearCart();
              this.router.navigate(['/home']);
            } else if (this.mess === 'There are products with excess quantity in stock') {
              alert(this.mess);
              this.router.navigate(['/shopping-cart']).then(() => {
                window.location.reload();
              });
            } else {
              alert('Err');
            }
          });
      }
    }

  }

  loadData() {
    this.service.load().subscribe((item: any[]) => {
      // @ts-ignore
      this.hotProduct = item.data.list;
      this.hotProductMen = [];
      this.hotProductWomen = [];
      for (let i = 0; i < this.hotProduct.length; i++) {
        if (this.hotProduct[i].product.category.categoryName == 'Men') {
          this.hotProductMen.push(this.hotProduct[i]);
        } else if (this.hotProduct[i].product.category.categoryName == 'Women') {
          this.hotProductWomen.push(this.hotProduct[i]);
        }
      }
    });
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
