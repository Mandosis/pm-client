import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import * as io from 'socket.io-client';


@Injectable()
export class AuthService {

  showNavBar: boolean;
  redirectUrl: string;

  private jwtHelper: JwtHelper = new JwtHelper();
  private _socketUrl: string;

  constructor(private http: Http, private router: Router) { }

  /**
   * Submit email and password to server to get auth token if valid
   */
  login(email: string, password: string): Observable<boolean> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post('/v1/auth/login', JSON.stringify({email, password}), { headers })
      .map(res => res.json())
      .map((res) => {
        let token = res.data;

        if (token) {
          this.accessToken = token;
        }

        return res.success;
      });
  }

  /**
   * Delete JSON Web Token for local storage
   */
  logout() {
    localStorage.removeItem('accessToken');
    this.showNavBar = false;
    this.router.navigate(['signin']);
  }

  /**
   * Check if use is authenticated
   */
  isAuthenticated() {
    let isExpired: boolean;

    if (this.accessToken) {
      isExpired = this.jwtHelper.isTokenExpired(this.accessToken);
    }

    if (isExpired) {
      this.logout();
    }

    return new Observable(observer => {
      if (this.accessToken && !isExpired) {
        this.socket.on('connect', () => {
          this.socket
            .emit('authenticate', { token: this.accessToken })
            .on('authenticated', () => {
              this.showNavBar = true;
              observer.next(true);
              observer.complete();
            })
        });
      } else {
        this.showNavBar = false;
        observer.next(false);
        observer.complete();
      }
    })

  }

  /**
   * Connect to webSocket server
   */
  get socket(): SocketIOClient.Socket {
    return io.connect('');
  }

  /**
   * Handle JWT
   */
  get accessToken() {
    return localStorage.getItem('accessToken');
  }

  set accessToken(jwt: string) {
    localStorage.setItem('accessToken', jwt);
  }


  /**
   * Verify and refresh access token
   */
  refreshToken() {
    this.http.post('/v1/auth/refresh', { token: this.accessToken})
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          this.accessToken = res.data;
        }
        return res.success;
      })
      .subscribe((success) => {
        if (!success) {
          this.router.navigate(['/signin']);
        }
        console.log('refreshToken called.');
      });
  }

}