// @ts-ignore
import {Component, OnInit} from '@angular/core';
import {ShopService} from '../service/shop.service';
// @ts-ignore
import {HttpClient} from '@angular/common/http';
// @ts-ignore
import {ActivatedRoute, Router} from '@angular/router';
import {Product} from '../model/product';
import {Warehouse} from '../model/warehouse';
import {CommentRating} from '../model/commentRating';
import {Accounts} from '../model/account';
import {Cart} from '../model/cart';
import {CartService} from '../service/cart.service';
import {Images} from '../model/images';

// @ts-ignore
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productId: string;

  categoryName: string;

  property: string;

  accountId: string;

  quantity: number;

  productToCart: Product = new Product();

  account: Accounts = new Accounts();

  commentR: CommentRating [];

  warehouse: Warehouse = new Warehouse();

  product: Product = new Product();

  listProduct: Product[];

  listCart: [];

  cart: Cart = new Cart();

  listImage: Images[];


  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private service: ShopService, private CartService: CartService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.productId = params.Id;
      this.getListImage(this.productId);
      this.detail(this.productId);
      this.warehouseByProductId(this.productId);
      this.commentRating(this.productId);
      this.quantity = 1;
    });
  }

  addToCart(id: string) {
    this.service.detail(id).subscribe((item: any) => {
      this.productToCart = item.data;
      if (this.listCart == null) {
        this.cart.productId = this.productToCart.productId;
        this.cart.image = this.productToCart.imageProduct;
        this.cart.productName = this.productToCart.productName;
        this.cart.property = this.property;
        this.cart.sellerId = this.accountId;
        this.cart.productPrice = this.productToCart.productPrice;
        // @ts-ignore
        this.cart.totalPrice = this.productToCart.productPrice * this.quantity;
        this.cart.quantity = this.quantity;
        this.CartService.addToCart(this.cart);
        this.router.navigate(['/shopping-cart']).then(() => {
          window.location.reload();
        });
      } else {
        // localStorage.setItem('cart', JSON.stringify(this.listCart));
      }
    });


  }

  getListImage(id: string) {
    this.service.getListImageByProductId(id).subscribe((items: any[]) => {
      // @ts-ignore
      this.listImage = items.imageDTOS;
    });
  }

  detail(id: string) {
    this.service.detail(id).subscribe((item: any) => {
      this.product = item.data;
      this.accountId = item.data.accountId;
      this.categoryName = item.data.category.categoryName;
      this.service.getAllProductByAccoutnId(this.accountId).subscribe((item2: any[]) => {
        // @ts-ignore
        this.listProduct = item2;
      });
      this.service.getAccount(this.accountId).subscribe((item3: any) => {
        this.account = item3.data;
      });
    });
  }

  warehouseByProductId(id: string) {
    this.service.warehouseByProductId(id).subscribe((item: any) => {
      this.warehouse = item.data;
    });
  }


  changeQuantityMinus() {
    // window.location.reload();
    if (this.quantity <= 1) {
      alert('Invalid quantity !!!');
    } else {
      // @ts-ignore
      this.quantity -= 1;
    }
  }

  changeQuantityPlus() {
    // window.location.reload();
    // @ts-ignore
    this.quantity = this.quantity + 1;
  }


  commentRating(id: string) {
    this.service.commentRating(id).subscribe((item: any[]) => {
      // @ts-ignore
      this.commentR = item.data.commentRatingDTOList;
      console.log(this.commentR);
    });
  }


  redirectProduct(id) {
    window.location.href = '/product?Id=' + id;
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
