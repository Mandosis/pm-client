import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { AuthService } from '../auth/auth.service';
import { User } from './user';

@Injectable()
export class UserService {

  constructor(
    private http: Http,
    private authService: AuthService
  ) { }

  // private _getHeaders() {
  //   let headers = new Headers();
  //   let accessToken = this.authService.accessToken;

  //   headers.append('Content-Type', 'application/json');
  //   headers.append('x-access-token', accessToken);

  //   return headers;
  // }

  // getById(id: string) {
  //   let url = `/v1/users/id/${id}`;
  //   let headers = this._getHeaders();

  //   return this.http
  //     .get(url, { headers })
  //     .map(res => res.json())
  //     .map((res) => {
  //       return new User(res.data);
  //     });
  // }

}
