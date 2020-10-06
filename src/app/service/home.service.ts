import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private url = 'http://localhost:8080/hotProducts/getAllHotProductActive';

  constructor(private http: HttpClient) { }

  load() {
    return this.http.get(this.url);
  }
}
