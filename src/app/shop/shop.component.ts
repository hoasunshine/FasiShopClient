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
