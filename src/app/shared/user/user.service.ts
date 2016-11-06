import { Injectable, Inject } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { JwtHelper} from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { User } from './user';


@Injectable()
export class UserService {

  constructor(private http: Http) { }

  private _getHeaders() {
    let token = localStorage.getItem('accessToken');
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', token);

    return headers;
  }

  getById(id: string) {
    let url = `/v1/users/id/${id}`;
    let headers = this._getHeaders();

    return this.http
      .get(url, { headers })
      .map(res => res.json())
      .map((res) => {
        return new User(res.data);
      });
  }

}
