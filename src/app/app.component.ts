// @ts-ignore
import {Component, OnInit} from '@angular/core';

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

  constructor() {
  }


  ngOnInit(): void {
    this.arr = JSON.parse(localStorage.getItem('cart'));
    this.count = this.arr.length;
  }

}
