import { Component, OnInit } from '@angular/core';
import { Location }          from '@angular/common';
import { Router }            from '@angular/router';

import { AuthService } from '../shared/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  message: string = '';

  constructor(
    private authService: AuthService,
    private location: Location,
    private router: Router,
  ) {}

  ngOnInit() {
  }

  login() {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password)
        .subscribe((success) => {

          if (success) {
            let redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/';

            this.router.navigate([redirect]);
          } else {
            this.message = 'Username or password incorrect.';
          }
          
        });
    } else {
      // TODO: add better checking
      this.message = 'Username or password missing.';
    }
  }

}
