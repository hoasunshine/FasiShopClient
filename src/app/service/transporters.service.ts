import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TransportersService {

  private url = 'http://localhost:8080/transporters';

  public options = {headers: new HttpHeaders().set('Authorization', '1')};

  constructor(private http: HttpClient) {

  }

  load() {
    return this.http.get(this.url, this.options);
  }

}
