import {Injectable, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
// @ts-ignore
import {Blog} from '../model/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private url = 'http://localhost:8080/blog';
  public options = {headers: new HttpHeaders().set('Authorization', '1')};


  constructor(public router: Router,
              private http: HttpClient) {
  }

  load() {
    return this.http.get(this.url,this.options);
  }

  detail(id: string) {
    return this.http.get(`${this.url}/${id}`,this.options);
  }

  create(blog: Blog) {
    const obj = JSON.stringify(blog);
    return this.http.post(this.url, obj, {headers: {'Content-Type': 'application/json'}}).subscribe((item: any) => {
      const status = item.status;
      if (status === 200) {
        alert('Success !!!');
      } else {
        alert('Err !!!');
      }
    });
  }
}
