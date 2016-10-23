import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';

import { AuthService } from '../auth.service';

@Injectable()
export class ProjectService {

  constructor(private http: Http, private authService: AuthService) { }

  create(title: string, description: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', this.authService.accessToken.toString());

    return this.http
      .post('/v1/projects', JSON.stringify({title, description}), { headers })
      .map(res => res.json())
      .map((res) => {
        console.log(res);

        // TODO: redirect to new project
        return res;
      })
  }

}
