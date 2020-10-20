import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {CartService} from '../service/cart.service';
import {OrderService} from '../service/order.service';
import {Orders} from '../model/order';
import {Cart} from '../model/cart';
import {Accounts} from '../model/account';

@Component({
  selector: 'app-order-management',
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent implements OnInit {

  arrayOrder: Orders[];
  array: Orders[];
  arrayOrderDetail: [];
  accounts: Accounts = new Accounts();
  order: Orders = new Orders();
  show: boolean = false;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private service: OrderService) {
  }

  ngOnInit(): void {
    this.accounts = JSON.parse(localStorage.getItem('currentUser'));
    this.service.getlist().subscribe((items => {
      // @ts-ignore
      this.arrayOrder = items.data.list;
      this.array = [];
      for (let i = 0; i < this.arrayOrder.length; i++) {
        if (this.accounts.accountId == this.arrayOrder[i].accountId && this.arrayOrder[i].status != 'Done') {
          this.array.push(this.arrayOrder[i]);
        }
        if (this.arrayOrder[i].status == 'Shipping') {
          this.show = true;
        }
      }
      console.log(this.array);
    }));
  }

  confirm(id: string) {
    for (let i = 0; i < this.arrayOrder.length; i++) {
      if (this.arrayOrder[i].id == id) {
        this.order = this.arrayOrder[i];
      }
    }
    if (this.order.status !== 'Shipping') {
      alert('You have not yet confirmed your order !!!')
    }else {
      this.service.confirm(id);
    }
  }

  detail(id: string) {
    this.service.detail(id).subscribe((item: any[]) => {
      // @ts-ignore
      this.arrayOrderDetail = item.data.orderDetailDTOList;
      console.log(this.arrayOrderDetail);
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
