import {Component, OnInit} from '@angular/core';
import {Accounts} from '../model/account';
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from '../service/authentication.service';
import {Role} from '../model/role';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  accountName: string;
  phoneNumber: string;
  email: string;
  address: string;
  gender: string;
  password: string;
  birthday: string;
  accounts: Accounts = new Accounts();

  role: Role = new Role();

  constructor(private http: HttpClient, private service: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  register() {
    const rolesList = [];
    // @ts-ignore
    this.role.roleId = 2;
    // @ts-ignore
    rolesList.push(this.role);
    this.accounts.accountName = this.accountName;
    this.accounts.phoneNumber = this.phoneNumber;
    this.accounts.email = this.email;
    this.accounts.address = this.address;
    this.accounts.gender = this.gender;
    this.accounts.password = this.password;
    this.accounts.birthday = this.birthday;
    this.accounts.rolesList = rolesList;
    this.service.Register(this.accounts);
  }
}
