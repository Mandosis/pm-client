import { Component, OnInit } from '@angular/core';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Refresh access token
    this.authService.refreshToken();

    // Refresh every 30 minutes
    let halfHour: number = 1000 * 60  * 30; 
    setInterval(() => {
      this.authService.refreshToken();
    }, halfHour);
  }
}
