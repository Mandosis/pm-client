import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';

import { AuthService } from '../auth.service';

@Injectable()
export class ProjectService {

  constructor(private http: Http, private authService: AuthService) { }

  newProject(project: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('x-access-token', this.authService.accessToken);

    return this.http
      .post('/v1/projects', JSON.stringify(project), { headers })
      .map(res => res.json())
      .map((res) => {

        // TODO: redirect to new project
        return res.success;
      })
  }

}
