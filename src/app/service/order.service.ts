import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private url = 'http://localhost:8080/order';
  private url5 = 'http://localhost:8080/accounts';

  public options = {headers: new HttpHeaders().set('Authorization', '1')};

  constructor(private router: Router, private http: HttpClient) {
  }

  getlist() {
    return this.http.get(this.url, this.options);
  }

  confirm(id: string) {
    return this.http.delete(`${this.url}/done/${id}`, this.options).subscribe((item: any) => {
        window.location.reload();
        alert('Confirm Success !!!');
      },
      (error) => alert('Sorry Err !!!'));
  }

  detail(id: string) {
    return this.http.get(`${this.url}/${id}`, this.options)
  }

}
