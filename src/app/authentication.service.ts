import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import * as io from 'socket.io-client'


@Injectable()
export class AuthenticationService {

  private jwtHelper: JwtHelper = new JwtHelper();
  private _socketUrl: string;
  private _socket: SocketIOClient.Socket;

  constructor(private http: Http) { }

  login(email: string, password: string): Observable<boolean> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post('/v1/login', JSON.stringify({email, password}), { headers })
      .map(res => res.json())
      .map((res) => {
        let user = res.data;

        if (user && user.token) {
          localStorage.setItem('accessToken', user.token);
        }

        return res.success;
      });
  }

  logout() {
    localStorage.removeItem('accessToken');
  }

  isAuthenticated() {
    let accessToken = localStorage.getItem('accessToken');
    let isExpired: boolean = this.jwtHelper.isTokenExpired(accessToken);

    return new Observable(observer => {
      if (accessToken && !isExpired) {
        this._connectSocket();
        this._socket.on('connect', () => {
          observer.next(true);
        })

        this._socket.on('unauthorized', (error, callback) => {
          observer.next(false);
        })
      } else {
        observer.false;
      }
    })

  }

  private _connectSocket() {
    this._socket = io.connect('', {
      query: 'token=' + localStorage.getItem('accessToken')
    })
  }

}
