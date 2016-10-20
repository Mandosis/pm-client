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

  redirectUrl: string;

  private jwtHelper: JwtHelper = new JwtHelper();
  private _socketUrl: string;
  private _socket: SocketIOClient.Socket;

  constructor(private http: Http, private router: Router) { }

  /**
   * Submit email and password to server to get auth token if valid
   */
  login(email: string, password: string): Observable<boolean> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post('/v1/login', JSON.stringify({email, password}), { headers })
      .map(res => res.json())
      .map((res) => {
        let user = res.data;

        if (user && user.token) {
          this.accessToken = user.token;
        }

        return res.success;
      });
  }

  /**
   * Delete JSON Web Token for local storage
   */
  logout() {
    localStorage.removeItem('accessToken');
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
        this._connectSocket();
        this._socket.on('connect', () => {
          observer.next(true);
          observer.complete();
        })

        this._socket.on('unauthorized', (error, callback) => {
          console.log('socket unauthorized');
          observer.next(false);
          observer.complete();
        })
      } else {
        observer.next(false);
        observer.complete();
      }
    })

  }

  /**
   * Connect to webSocket server
   */
  private _connectSocket() {
    this._socket = io.connect('', {
      query: 'token=' + this.accessToken
    })
  }

  get accessToken() {
    return localStorage.getItem('accessToken');
  }

  set accessToken(jwt: string) {
    localStorage.setItem('accessToken', jwt);
  }

}
