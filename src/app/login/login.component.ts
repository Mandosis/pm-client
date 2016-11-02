import { Component, OnInit, Renderer } from '@angular/core';
import { Location }                    from '@angular/common';
import { Router }                      from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  message: string;

  constructor(
    private authService: AuthService,
    private location: Location,
    private router: Router,
    private renderer: Renderer
  ) {}

  ngOnInit() {
  }

  login() {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password)
        .subscribe((result) => {
          let isAuthenticated: boolean = this.authService.isAuthenticated();

          if (isAuthenticated) {
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
