// @ts-ignore
import {Component, OnInit} from '@angular/core';
import {Product} from '../model/product';
import {ShopService} from '../service/shop.service';
// @ts-ignore
import {HttpClient} from '@angular/common/http';
// @ts-ignore
import {ActivatedRoute} from '@angular/router';
import {newArray} from '@angular/compiler/src/util';

// @ts-ignore
@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {


  Page: number;
  collectionSize: number;
  searchText;
  AccountId: string;
  pageSize: number;
  products: Product[];
  product: Product = new Product();
  maxAmount: number;
  minAmount: number;
  arr = [];

  constructor(private http: HttpClient, private serviceShop: ShopService, private route: ActivatedRoute) {
    this.minAmount = null;
    this.maxAmount = null;
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.AccountId = params.AccountId;
    });
    this.loadData(this.AccountId);
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
    } else {
      this.serviceShop.load().subscribe((item: any[]) => {
        // @ts-ignore
        this.products = item.data.productDTOList;
        this.Page = 1;
        this.collectionSize = this.products.length;
        this.pageSize = 9;
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
    if (this.minAmount < 0 || this.maxAmount < 0) {
      alert('Err');
    } else if (this.minAmount != null && this.maxAmount == null) {
      for (let i = 0; i < this.products.length; i++) {
        // @ts-ignore
        if (this.products[i].productPrice >= this.minAmount) {
          this.arr.push(this.products[i]);
        }
      }
      return this.products = this.arr;
    } else if (this.maxAmount != null && this.minAmount == null) {
      for (let i = 0; i < this.products.length; i++) {
        // @ts-ignore
        if (this.products[i].productPrice <= this.maxAmount) {
          this.arr.push(this.products[i]);
        }
      }
      return this.products = this.arr;
    } else if (this.maxAmount != null && this.minAmount != null) {
      for (let i = 0; i < this.products.length; i++) {
        // @ts-ignore
        if (this.products[i].productPrice <= this.maxAmount && this.products[i].productPrice >= this.minAmount) {
          this.arr.push(this.products[i]);
        }
      }
      return this.products = this.arr;
    } else {
      alert('please enter price range !!!');
      return this.products;
    }
  }
}
