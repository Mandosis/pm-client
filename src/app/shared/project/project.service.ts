import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { AuthService } from '../auth/auth.service';
import { IssueTrackerService } from '../issue-tracker/issue-tracker.service';
import { IssueTracker } from '../issue-tracker/issue-tracker';
import { Project } from './project';

@Injectable()
export class ProjectService {

  private _project: Project;
  private _issueTracker: IssueTracker;

  private _headers = new Headers();

  constructor(
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private issueTrackerService: IssueTrackerService
  ) { }

  private _setHeaders() {
    let accessToken = this.authService.accessToken;

    this._headers.append('Content-Type', 'application/json');
    this._headers.append('x-access-token', accessToken.toString());
  }

  create(title: string, description: string) {
    this._setHeaders();
    let headers = this._headers;
    let body = JSON.stringify({ title: title, description: description });

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

    return this.http
      .get('/v1/projects/url/' + url, { headers })
      .map(res => res.json())
      .map((res) => {
        if (res.success) {
          this._project = new Project(res.data);
        }

        return res;
      });

  }

  isMember() {
    let project = this._project;

    if (!project) {
      return false;
    }

    for (let user of project.members) {

      if (user.toString() === this._currentUserId) {
        return true;
      }

    }

    return false;
  }

  isAdmin() {

  }

  isAuthenticated(url: string) {
    let headers = this.authService.getHeaders();
    let body = JSON.stringify({ url });

    return this.http
      .post('/v1/auth/project', body, { headers })
      .map(res => res.json())
      .map((res) => {
        return res.success;
      });
  }

  get currentProject() {
    return this._project;
  }

  get currentIssueTracker() {
    return this._issueTracker;
  }

  private get _currentUserId() {
    return this.authService.currentUser.id;
  }

  private _getIssueTracker() {
    console.log('project:', this._project);
    if (!this._project) {
      return false;
    }

    this.issueTrackerService.getById(this._project.issue_tracker)
      .subscribe((result) => {
        this._issueTracker = result;
        console.log(this._issueTracker);
      });
  }

  get url() {
    return this.activatedRoute.snapshot.params['url'];
  }


}
