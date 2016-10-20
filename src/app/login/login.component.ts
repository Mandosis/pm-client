import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  error: string;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  login() {
    if (this.email && this.password) {
      this.authService.login(this.email, this.password)
        .subscribe((result) => {
          console.log(result, localStorage.getItem('accessToken'));
          this.authService.isAuthenticated()
            .subscribe((result) => {
              console.log('Authenticated: ' + result);
            })
        })
    } else {
      // TODO: add better checking
      console.log('user name or password missing');
    }
    console.log('login button hit');
  }

}
