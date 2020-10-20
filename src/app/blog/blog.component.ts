import {Component, OnInit} from '@angular/core';
import {BlogService} from '../service/blog.service';
// @ts-ignore
import {Blogs} from '../model/blog';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  listBlog : Blogs[];

  constructor(private service: BlogService) {
  }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.service.load().subscribe((items: any[]) => {
      // @ts-ignore
      this.listBlog = items.data.list;
      console.log(this.listBlog);
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
