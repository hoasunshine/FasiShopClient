import {Component, OnInit} from '@angular/core';
import {Product} from '../model/product';
import {ShopService} from '../service/shop.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {


  AccountId: string;
  products: Product[];
  product: Product = new Product();

  constructor(private http: HttpClient, private serviceShop: ShopService, private route: ActivatedRoute) {
    console.log();
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
      });
    } else {
      this.serviceShop.load().subscribe((item: any[]) => {
        // @ts-ignore
        this.products = item.data.productDTOList;
      });
    }
  }
}
