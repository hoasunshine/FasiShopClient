import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;

  constructor(private http: HttpClient, private service: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  login() {
    this.service.SignIn(this.email, this.password);
  }

}
