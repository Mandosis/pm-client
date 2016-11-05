import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthService } from '../auth/auth.service';
import { Project } from './project';

@Injectable()
export class ProjectService {

  private _project: Project;

  private _headers = new Headers();

  constructor(private http: Http, private authService: AuthService) { }

  private _setHeaders() {
    let accessToken = this.authService.accessToken;

    this._headers.append('Content-Type', 'application/json');
    this._headers.append('x-access-token', accessToken.toString());
  }

  create(title: string, description: string) {
    this._setHeaders();
    let headers = this._headers;
    let body = JSON.stringify({ title, description })

    return this.http
      .post('/v1/projects', body, { headers })
      .map(res => res.json())
      .map((res) => {
        console.log(res);

        // TODO: redirect to new project
        return res;
      })
  }

  getByUrl(url: string) {
    this._setHeaders();
    let headers = this._headers;
    let body = JSON.stringify({url});

    return this.http
      .post('/v1/projects/url', body, { headers })
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          this._project = new Project(res.data);
        }

        return res;
      });

  }

  isMember() {
    // let memberKeys = this._project.members.keys;
    // let memberValues = this._project.members.values;

    // let memberTestValue = [
    //   {

    //   }
    // ]
    // let memberMap = new Map(memberKeys)

    // for (let key of this._project.members) {

    // }

  }

  isAdmin() {

  }

  get currentProject() {
    return this._project;
  }

  private get _currentUserId() {
    return this.authService.currentUser.id;
  }


}
