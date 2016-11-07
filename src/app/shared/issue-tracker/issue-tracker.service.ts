import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { IssueTracker } from './issue-tracker';
import { AuthService }  from '../auth/auth.service';


@Injectable()
export class IssueTrackerService {

  constructor(private http: Http, private authService: AuthService) { }

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
          return new IssueTracker(res.data);
        }

        return null;
      });
  }
}
