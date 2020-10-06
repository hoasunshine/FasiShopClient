// @ts-ignore
import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ShopService} from '../service/shop.service';
import {ActivatedRoute} from '@angular/router';
import {HomeService} from '../service/home.service';
import {HotProduct} from '../model/hotProduct';

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

  constructor(private http: HttpClient, private service: HomeService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadData();
    console.log(this.hotProductWomen);
    console.log(this.hotProductMen);
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
