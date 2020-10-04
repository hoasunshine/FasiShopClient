import {Injectable, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {Accounts} from '../model/account';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  private url = 'http://localhost:8080/accounts/login';
  private register = 'http://localhost:8080/accounts/register';

  private currentUserSubject: BehaviorSubject<Accounts>;

  account: Accounts = new Accounts();

  public currentUser: Observable<Accounts>;

  constructor(public router: Router,
              public ngZone: NgZone,
              private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Accounts>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  SignIn(email: string, password: string) {
    let body = new HttpParams();
    body = body.set('email', email);
    body = body.set('password', password);
    this.http.post(this.url, body).subscribe((item: any) => {
        this.account = item;
        localStorage.setItem('currentUser', JSON.stringify(this.account));
        this.router.navigate(['/home']).then(() => {
          window.location.reload();
        });
        alert('Login Success !!!');
      },
      (error) => alert('Account or password is incorrect !!!'));
  }

  Register(account: Accounts) {
    const obj = JSON.stringify(account);
    console.log(account);
    console.log(this.register, obj);
    return this.http.post(this.register, obj, {
      headers: {'Content-Type': 'application/json'}
    }).subscribe((item: any) => {
      const string = item.message;
      const status = item.status;
      if (status === 208) {
        alert('Account Already Exist !!!');
      } else if (string === 'Action Success') {
        console.log(string);
        console.log(status);
        alert('Register Success !!!');
        this.router.navigate(['/login']);
      } else {
        alert('NotFound');
      }
    });
  }
}
