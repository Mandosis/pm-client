import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IssueTrackerService } from '../../../shared/issue-tracker/issue-tracker.service';
import { Issue } from '../../../shared/issue-tracker/issue';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {

  private _issue: Issue;

  constructor(
    private issueTrackerService: IssueTrackerService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.issueTrackerService.getIssue(id)
      .subscribe((result) => {
        console.log(result);
        this._issue = new Issue(result.data);

        console.log('private _issue:', this._issue);
      });
  }

  get issue() {
    return this._issue;
  }

}
