// @ts-ignore
import {Component, OnInit} from '@angular/core';

// @ts-ignore
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'market-dress';

  constructor() {
  }


  ngOnInit(): void {

  }

  // async ngAfterViewInit(){
  //   await this.loadScript('assets/js/jquery-3.3.1.min.js');
  //   await this.loadScript('assets/js/bootstrap.min.js');
  //   await this.loadScript('assets/js/jquery-ui.min.js');
  //   await this.loadScript('assets/js/jquery.countdown.min.js');
  //   await this.loadScript('assets/js/jquery.nice-select.min.js');
  //   await this.loadScript('assets/js/jquery.dd.min.js');
  //   await this.loadScript('assets/js/jquery.slicknav.js');
  //   await this.loadScript('assets/js/owl.carousel.min.js');
  //   await this.loadScript('assets/js/jquery.zoom.min.js');
  //   await this.loadScript('assets/js/main.js');
  //   await this.loadScript('assets/js/imagesloaded.pkgd.min.js');
  // }
  //
  // loadScript(scriptUrl: string) {
  //   return new Promise(((resolve, reject) => {
  //     const scriptElement = document.createElement('script');
  //     scriptElement.src = scriptUrl;
  //     scriptElement.onload = resolve;
  //     document.body.appendChild(scriptElement);
  //   }))
  // }

}
