// @ts-ignore
import {Component, OnInit} from '@angular/core';
import {Accounts} from './model/account';
import {log} from 'util';

// @ts-ignore
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'market-dress';
  arr: [];
  count: number;
  currentUser: Accounts = new Accounts();
  currentUserEmail: string;
  show: boolean = false;

  constructor() {
  }


  ngOnInit(): void {
    this.arr = JSON.parse(localStorage.getItem('cart'));
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser != null) {
      this.currentUserEmail = this.currentUser.email;
      this.show = true;
    }
    if (this.arr == null) {
      this.count = 0;
    } else {
      this.count = this.arr.length;
    }
  }

  logout() {
    this.currentUser = null;
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    window.location.reload();
  }
}
