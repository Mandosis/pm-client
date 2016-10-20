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
  error: string;

  constructor(
    private authService: AuthService,
    private location: Location,
    private router: Router,
    private renderer: Renderer
  ) { }

  ngOnInit() {
  }

  login() {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password)
        .subscribe((result) => {
          // Check web socket authentication
          this.authService.isAuthenticated()
            .subscribe((result) => {

              // Redirect upon login
              let redirectUrl = this.authService.redirectUrl;

              if (redirectUrl) {
                this.location.back();
              } else {
                this.router.navigate(['']);
              }
            })
        })
    } else {
      // TODO: add better checking
      console.log('user name or password missing');
    }
  }

}
