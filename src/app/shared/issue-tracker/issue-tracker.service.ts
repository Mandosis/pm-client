import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { IssueTracker } from './issue-tracker';
import { AuthService }  from '../auth/auth.service';

import { Issue } from './issue';


@Injectable()
export class IssueTrackerService {

  private _issueTracker: IssueTracker;

  constructor(
    private http: Http,
    private authService: AuthService
  ) { }

  getById(id: string) {
    console.log('issueTrackerId:', id);
    let headers = this.authService.getHeaders();
    let body = JSON.stringify({id});
    
    return this.http
      .post('/v1/projects/issue-tracker', body, { headers })
      .map(res => res.json())
      .map((res) => {
        console.log(res);
        if (res.success) {
          this._issueTracker = new IssueTracker(res.data);
          return this._issueTracker;
        }

        return null;
      });
  }


  newIssue(issue: any) {
    console.log('Issue:', issue);

    issue.issue_tracker = this._issueTracker.id;
    let headers = this.authService.getHeaders();
    let body = JSON.stringify(issue);

    console.log('Issue Body:', body);

    return this.http
      .post('/v1/issue-trackers/issues', body, { headers })
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }

  getIssue(id: string) {
    let headers = this.authService.getHeaders();
    let url = `/v1/issue-trackers/issues/${id}`;

    return this.http
      .get(url, { headers })
      .map(res => res.json())
      .map((res) => {
        return res;
      });
  }
}
