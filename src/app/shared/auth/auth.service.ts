import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import * as io from 'socket.io-client';

import { UserService } from '../user/user.service';
import { User } from '../user/user';


@Injectable()
export class AuthService {

  showNavBar: boolean;
  redirectUrl: string;
  private _currentUser: User;

  private jwtHelper: JwtHelper = new JwtHelper();
  private _socketUrl: string;

  constructor(
    private http: Http,
    private router: Router,
    private userService: UserService
  ) { }

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
          this._getCurrentUser();
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
    this._currentUser = null;
    this.router.navigate(['signin']);
  }

  /**
   * Check if user is authenticated
   */
  get isAuthenticated(): boolean {

    // TODO: Change to a simple test to see if JWT exists and not expired.
    let isExpired: boolean = true;

    if (this.accessToken) {
      isExpired = this.jwtHelper.isTokenExpired(this.accessToken); // Not setting token as expired for some reason.
    }

    console.log('isExpired:', isExpired);

    if (isExpired) {
      this.logout();
      this.showNavBar = false;
      this._currentUser = null;

      return false;
    }

    this._getCurrentUser();
    this.showNavBar = true;
    return true;

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

    if (!this.accessToken) {
      return;
    }
    
    this.http.post('/v1/auth/refresh', { token: this.accessToken})
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          this.accessToken = res.data;
        }

        console.log(res);
        return res.success;
      })
      .subscribe((success) => {
        if (!success) {
          this.logout();
          this.router.navigate(['/signin']);
        }
        console.log('refreshToken called.');
      });
  }


  /**
   * Get and return current user information
   */
  // Set current user in userService or authService?
  private _getCurrentUser() {
    let id = this.jwtHelper.decodeToken(this.accessToken).id;
    this.userService.getById(id)
      .subscribe((user) => {
        this._currentUser = user;
      })
  }

  get currentUser() {
    return this._currentUser;
  }

  getHeaders(): Headers {
    let headers = new Headers();
    let accessToken = this.accessToken;

    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', accessToken.toString());

    return headers;
  }



}
