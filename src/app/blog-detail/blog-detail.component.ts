import {Component, OnInit} from '@angular/core';
import {BlogService} from '../service/blog.service';
import {ActivatedRoute, Router} from '@angular/router';
// @ts-ignore
import {Blog} from '../model/blog';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})

export class BlogDetailComponent implements OnInit {

  Id: string;

  blog: Blog = new Blog();

  constructor(private service: BlogService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.Id = params.Id;
      this.detail(this.Id);
    });
  }

  detail(id: string) {
    this.service.detail(id).subscribe((item: any) => {
      // item.data;
      this.blog = item.data;
      console.log(this.blog);
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
