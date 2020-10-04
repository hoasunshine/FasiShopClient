// @ts-ignore
import {Component, OnInit} from '@angular/core';
import {Product} from '../model/product';
import {ShopService} from '../service/shop.service';
// @ts-ignore
import {HttpClient, HttpParams} from '@angular/common/http';
// @ts-ignore
import {ActivatedRoute} from '@angular/router';
import {newArray} from '@angular/compiler/src/util';
import {Accounts} from '../model/account';
import {Category} from '../model/category';

// @ts-ignore
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {


  show: boolean = false;
  Page: number;
  collectionSize: number;
  searchText;
  AccountId: string;
  pageSize: number;
  products: Product[];
  products2: Product[];
  product: Product = new Product();
  account: Accounts = new Accounts();
  endPrice: number;
  startPrice: number;
  categoryId: string;
  arr = [];
  categories: Category[];

  constructor(private http: HttpClient, private serviceShop: ShopService, private route: ActivatedRoute) {
    this.endPrice = null;
    this.startPrice = null;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.AccountId = params.AccountId;
    });
    this.route.queryParams.subscribe(param => {
      this.categoryId = param.categoryId;
    });
    this.loadData(this.AccountId || this.categoryId);
    this.loadAccount(this.AccountId);
    this.loadCategory();
  }

  loadData(id: string): void {
    if (this.AccountId != null) {
      // @ts-ignore
      this.serviceShop.getAllProductByAccoutnId(id).subscribe((item2: any[]) => {
        this.products = item2;
        this.Page = 1;
        this.collectionSize = this.products.length;
        this.pageSize = 9;
      });
    }
    // else if (this.categoryId != null) {
    //   this.serviceShop.load().subscribe((item: any[]) => {
    //     // @ts-ignore
    //     this.products2 = item.data;
    //     console.log(this.products2);
    //     this.products = [];
    //     for (let i = 0; i < this.products2.length; i++) {
    //       console.log(this.products2[i].category.categoryId);
    //       if (this.products2[i].category.categoryId == id) {
    //         this.product = new Product();
    //         this.product = this.products2[i];
    //         console.log(this.product);
    //         this.products.push(this.product);
    //         this.Page = 1;
    //         this.collectionSize = this.products.length;
    //         this.pageSize = 9;
    //       }
    //     }
    //   });
    // }
    else {
      this.serviceShop.load().subscribe((item: any[]) => {
        // @ts-ignore
        this.products = item.data;
        this.Page = 1;
        this.collectionSize = this.products.length;
        this.pageSize = 9;
      });
    }
  }

  loadCategory() {
    this.serviceShop.getCategory().subscribe((item: any[]) => {
      // @ts-ignore
      this.categories = item.data.list;
    });
  }

  loadAccount(id: string) {
    if (id != null) {
      this.serviceShop.getAccount(id).subscribe((item: any) => {
        this.account = item.data;
        console.log(this.account);
        this.show = true;
      });
    }

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

  filters() {
    const params = new HttpParams()
      .set('startPrice', String(this.startPrice))
      .set('endPrice', String(this.endPrice));
    // if (this.minAmount < 0 || this.maxAmount < 0) {
    //   alert('Err');
    // } else if (this.minAmount != null && this.maxAmount == null) {
    //   for (let i = 0; i < this.products.length; i++) {
    //     // @ts-ignore
    //     if (this.products[i].productPrice >= this.minAmount) {
    //       this.arr.push(this.products[i]);
    //     }
    //   }
    //   return this.products = this.arr;
    // } else if (this.maxAmount != null && this.minAmount == null) {
    //   for (let i = 0; i < this.products.length; i++) {
    //     // @ts-ignore
    //     if (this.products[i].productPrice <= this.maxAmount) {
    //       this.arr.push(this.products[i]);
    //     }
    //   }
    //   return this.products = this.arr;
    // } else if (this.maxAmount != null && this.minAmount != null) {
    //   for (let i = 0; i < this.products.length; i++) {
    //     // @ts-ignore
    //     if (this.products[i].productPrice <= this.maxAmount && this.products[i].productPrice >= this.minAmount) {
    //       this.arr.push(this.products[i]);
    //     }
    //   }
    //   return this.products = this.arr;
    // } else {
    //   alert('please enter price range !!!');
    //   return this.products;
    // }
    // @ts-ignore
    this.http.get('http://localhost:8080/products?' + params).subscribe((items: any[]) => {
      // @ts-ignore
      this.products = items.data;
      console.log('http://localhost:8080/products?' + params);
      console.log(items);
    });
  }

  reload() {
    this.serviceShop.load().subscribe((item: any[]) => {
      // @ts-ignore
      this.products2 = item.data;
      console.log(this.products2);
      this.products = [];
      for (let i = 0; i < this.products2.length; i++) {
        console.log(this.products2[i].category.categoryId);
        if (this.products2[i].category.categoryId == this.categoryId) {
          this.product = new Product();
          this.product = this.products2[i];
          console.log(this.product);
          this.products.push(this.product);
          this.Page = 1;
          this.collectionSize = this.products.length;
          this.pageSize = 9;
        }
      }
    });
  }
}
